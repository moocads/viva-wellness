export interface Location {
  id: number
  name: string
  address: string
  city: string
  province: string
  postalCode: string
  coordinates: {
    lat: number
    lng: number
  }
  phoneNumber: string
  hours: {
    monday: string
    tuesday: string
    wednesday: string
    thursday: string
    friday: string
    saturday: string
    sunday: string
  }
  services: {
    name: string
    imageUrl: string
  }[]
  storeType: 'retail' | 'authorized dealer' | 'kiosk'
  isOpen: boolean
  imageUrl?: string
} 