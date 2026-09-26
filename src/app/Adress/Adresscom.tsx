'use client'

import { addAdress, getAllAdress, removeAdress } from '@/Apis/action/AdressAction'
import { Button } from '@/components/ui/button'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/toast'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Check, Home, MapPin, Pencil, Plus, Trash2, X } from 'lucide-react'
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

interface Adress {
  _id?: string
  id?: string
  name: string
  details: string
  phone: string
  city: string
}

export default function Adresscom() {
  const queryClient = useQueryClient()

  const [showForm, setShowForm] = useState(false)
  const [editingAdress, setEditingAdress] = useState<Adress | null>(null)

  const { data: adressData, isLoading } = useQuery({
    queryKey: ['getUserAdress'],
    queryFn: async () => await getAllAdress(),
  })
console.log('data',adressData)
  // جلب مصفوفة العناوين بشكل آمن
  const addressesList: Adress[] = adressData?.data || []

  const { handleSubmit, control, reset } = useForm<Adress>({
    defaultValues: {
      name: '',
      details: '',
      phone: '',
      city: '',
    },
  })

  const handleResetForm = () => {
    setShowForm(false)
    setEditingAdress(null)
    reset({
      name: '',
      details: '',
      phone: '',
      city: '',
    })
  }

  const handleAddNew = () => {
    setEditingAdress(null)
    reset({
      name: '',
      details: '',
      phone: '',
      city: '',
    })
    setShowForm(true)
  }

  const handleEdit = (address: Adress) => {
    setEditingAdress(address)
    reset({
      name: address.name || '',
      details: address.details || '',
      phone: address.phone || '',
      city: address.city || '',
    })
    setShowForm(true)
  }

// Add / Edit Address Mutation
  const { mutate: handleSaveAddress, isPending: isSaving } = useMutation({
    mutationFn: async (data: Adress) => {
      // 1. إذا كنا في حالة تعديل، نحذف العنوان القديم أولاً
      if (editingAdress) {
        const oldId = editingAdress._id || editingAdress.id
        if (oldId) {
          await removeAdress(oldId)
        }
      }
      // 2. نقوم بإضافة العنوان بالبيانات الجديدة
      return await addAdress(data)
    },
    onSuccess: (resData) => {
      toast.add({
        type: 'success',
        description:
          editingAdress
            ? 'Address updated successfully'
            : 'Address added successfully',
      })
      // إعادة جلب العناوين لتحديث القائمة فوراً
      queryClient.invalidateQueries({ queryKey: ['getUserAdress'] })
      handleResetForm()
    },
    onError: () => {
      toast.add({
        type: 'error',
        description: 'Failed to save address',
      })
    },
  })

  // Delete Address Mutation
  const { mutate: delAddress, isPending: isDeleting } = useMutation({
    mutationFn: removeAdress,
    onSuccess: (deldata) => {
      toast.add({
        type: 'success',
        description: deldata?.message || 'Address removed successfully',
      })
      queryClient.invalidateQueries({ queryKey: ['getUserAdress'] })
    },
    onError: () => {
      toast.add({
        type: 'error',
        description: 'Failed to remove address',
      })
    },
  })

  function submitForm(data: Adress) {
    handleSaveAddress(data)
  }

  return (
    <div className="max-w-3xl mx-auto my-10 px-4 space-y-6">
      {/* Header section */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Home className="w-8 h-8 text-black dark:text-white" />
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              My Addresses
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Manage your delivery addresses
            </p>
          </div>
        </div>
        <Button
          onClick={handleAddNew}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add New
        </Button>
      </div>

      {/* Form Section */}
      {showForm && (
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm relative space-y-4">
          <div className="flex items-center justify-between pb-2">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">
              {editingAdress ? 'Edit Address' : 'Add New Address'}
            </h2>
            <button
              type="button"
              onClick={handleResetForm}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit(submitForm)} className="space-y-4">
            {/* Label (Alias) */}
            <Controller
              name="name"
              control={control}
              rules={{ required: 'Label is required' }}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    htmlFor={field.name}
                    className="text-xs font-semibold text-gray-700 dark:text-gray-300"
                  >
                    Label (Alias)
                  </FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="e.g. Home, Work, Parents..."
                    className="mt-1 rounded-xl"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* Address Details */}
            <Controller
              name="details"
              control={control}
              rules={{ required: 'Address details are required' }}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    htmlFor={field.name}
                    className="text-xs font-semibold text-gray-700 dark:text-gray-300"
                  >
                    Address Details
                  </FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="Building, street, area..."
                    className="mt-1 rounded-xl"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* Phone & City */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Controller
                name="phone"
                control={control}
                rules={{
                  required: 'Phone number is required',
                  pattern: {
                    value: /^01[0125][0-9]{8}$/,
                    message: 'Enter a valid Egyptian phone number',
                  },
                }}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel
                      htmlFor={field.name}
                      className="text-xs font-semibold text-gray-700 dark:text-gray-300"
                    >
                      Phone
                    </FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      placeholder="01xxxxxxxxx"
                      className="mt-1 rounded-xl"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="city"
                control={control}
                rules={{ required: 'City is required' }}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel
                      htmlFor={field.name}
                      className="text-xs font-semibold text-gray-700 dark:text-gray-300"
                    >
                      City
                    </FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      placeholder="Cairo"
                      className="mt-1 rounded-xl"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>

            {/* Actions: هنا تم تعديل نص ونوع الزرار ديناميكياً */}
            <div className="flex items-center gap-3 pt-2">
              <Button
                type="submit"
                disabled={isSaving}
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl flex items-center gap-2"
              >
                <Check className="w-4 h-4" />
                {isSaving
                  ? 'Saving...'
                  : editingAdress
                  ? 'Update Address'
                  : 'Save Address'}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={handleResetForm}
                className="rounded-xl border-gray-200 dark:border-gray-800"
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* List / Empty State */}
      {isLoading ? (
        <div className="text-center py-12 text-gray-400">Loading addresses...</div>
      ) : addressesList.length === 0 ? (
        /* Empty State */
        <div className="bg-gray-50/50 dark:bg-gray-900/50 rounded-2xl py-16 flex flex-col items-center justify-center text-center border border-gray-100 dark:border-gray-800">
          <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4 text-gray-500">
            <MapPin className="w-8 h-8 stroke-[1.5]" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
            No addresses saved
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Add an address to speed up checkout
          </p>
        </div>
      ) : (
        /* Addresses List - مع الطباعة الآمنة */
        <div className="space-y-3">
          {addressesList.map((address) => {
            const addressId = address._id || address.id || ''
            return (
              <div
                key={addressId}
                className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-4 flex items-center justify-between hover:border-gray-300 dark:hover:border-gray-700 transition-all shadow-sm"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-50 dark:bg-blue-950/40 text-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-gray-900 dark:text-white text-sm">
                        {address.name || 'Address'}
                      </span>
                    </div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                      {address.details || 'No details specified'}
                      {address.city ? `, ${address.city}` : ''}
                    </p>
                    {address.phone && (
                      <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                        <span>📞 {address.phone}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 text-gray-400">
                  <button
                    type="button"
                    onClick={() => handleEdit(address)}
                    className="p-2 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                    title="Edit"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => delAddress(addressId)}
                    disabled={isDeleting}
                    className="p-2 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition-colors disabled:opacity-50"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}