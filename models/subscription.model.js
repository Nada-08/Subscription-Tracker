/*
    name: string
    required: true
    trim: true,
    minlength: 2,
    maxlength 100

    price: number
    required: true,
    min: 0,

    currency: string
    enum: ['USD', 'EUR', 'EGP']
    default: 'EGP'

    frequency: string
    enum: ['daily', 'weekly', 'monthly', 'yearly']

    category: string
    enum: ['sports', 'news', 'entertainment', 'lifestyle', 'technology', 'finance', 'politics', 'other']
    required: true

    paymentMethod: string
    required: true

    status: string
    enum: ['active', cancelled', 'expired']
    default: 'active'

    startDate: Date
    required: true, 
    validate: must be less or equal to current date


    renewalDate: Date
    required: true, 
    validate: must be greater than startDate

    user: 
    user id
    required: true
    index: true
    
*/