"use client"

import { type Location } from "@/types/location"
import Image from "next/image"
import { ChevronDown, ChevronUp } from "lucide-react"
import { useState, useRef } from "react"

// Example location data structure
const locations: Location[] = [
  {
    id: 1,
    name: "Park Place Corp Office",
    address: "1000 Markham Rd, E, Unit E5A",
    city: "Markham",
    province: "ON",
    postalCode: "L3R5H3",
    coordinates: {
      lat: 43.8561,
      lng: -79.3370
    },
    phoneNumber: "905-513-8886",
    hours: {
      monday: "11:00 AM - 7:00 PM",
      tuesday: "11:00 AM - 7:00 PM",
      wednesday: "11:00 AM - 7:00 PM",
      thursday: "11:00 AM - 7:00 PM",
      friday: "11:00 AM - 7:00 PM",
      saturday: "Closed",
      sunday: "Closed"
    },
    services: [
      {
        name: "Bell",
        imageUrl: "/images/bell.png"
      },
      {
        name: "Virgin",
        imageUrl: "/images/virgin.png"
      }
    ],
    storeType: "retail",
    isOpen: true,
    imageUrl: "/images/stores/park-place.jpg"
  },
  {
    id: 2,
    name: "Bell Store Downtown",
    address: "123 Main Street",
    city: "Toronto",
    province: "ON",
    postalCode: "M5V 2H1",
    coordinates: {
      lat: 43.6532,
      lng: -79.3832
    },
    phoneNumber: "+1 (416) 555-0123",
    hours: {
      monday: "9:00 AM - 9:00 PM",
      tuesday: "9:00 AM - 9:00 PM",
      wednesday: "9:00 AM - 9:00 PM",
      thursday: "9:00 AM - 9:00 PM",
      friday: "9:00 AM - 9:00 PM",
      saturday: "10:00 AM - 6:00 PM",
      sunday: "11:00 AM - 5:00 PM"
    },
    services: [
      {
        name: "Bell",
        imageUrl: "/images/bell.png"
      },
      {
        name: "Lucky",
        imageUrl: "/images/lucky.png"
      }
    ],
    storeType: "retail",
    isOpen: true,
    imageUrl: "/images/stores/downtown.jpg"
  }
]

export default function LocationsMap() {
  const [expandedLocation, setExpandedLocation] = useState<number | null>(1)

  const selectedLocation = locations.find(loc => loc.id === expandedLocation) || locations[0]
  
  const mapUrl = `https://www.google.com/maps/embed/v1/place?key=AIzaSyBEKL8ngoRhtopphMlNiHT1DXqqh7WuXd4&q=${encodeURIComponent(selectedLocation.address + ', ' + selectedLocation.city)}&zoom=15`

  const toggleLocation = (locationId: number) => {
    setExpandedLocation(expandedLocation === locationId ? null : locationId)
  }

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3">
            <div className="rounded-lg overflow-hidden border shadow-sm h-[400px] relative">
              <div className="absolute top-4 right-4 z-10 bg-[#0066A4] text-white px-4 py-2 rounded-md shadow-md">
                <span className="font-medium">{selectedLocation.name}</span>
              </div>

              <iframe
                src={mapUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>

          <div className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow-sm border p-4">
              {locations.map((location) => (
                <div key={location.id} className="border-b last:border-b-0">
                  <div
                    className="py-4 flex justify-between items-center cursor-pointer hover:text-bellBlue transition-colors duration-200"
                    onClick={() => toggleLocation(location.id)}
                  >
                    <span className="font-medium text-[#10306C]">{location.name}</span>
                    <div className={`transform transition-transform duration-200 ${
                      expandedLocation === location.id ? 'rotate-180' : ''
                    }`}>
                      <ChevronDown size={16} />
                    </div>
                  </div>
                  
                  <div className={`grid transition-all duration-200 ease-in-out ${
                    expandedLocation === location.id ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}>
                    <div className="overflow-hidden">
                      <div className="pb-4">
                        <div className="flex items-center mt-2 mb-4">
                          <div className="flex flex-wrap gap-2 mt-0">
                            {location.services.map((service, index) => (
                              <div key={index} className="flex items-center gap-1">
                                <Image
                                  src={service.imageUrl}
                                  alt={service.name}
                                  width={20}
                                  height={20}
                                  className="w-20"
                                />
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="flex gap-6">
                          <div className="flex-1">
                            <div className="text-sm font-medium text-[#0066A4] mb-1">Business Hours</div>
                            <div className="text-sm">Monday - Friday</div>
                            <div className="text-sm">{location.hours.monday}</div>
                            {location.hours.saturday !== "Closed" && (
                              <>
                                <div className="text-sm">Saturday</div>
                                <div className="text-sm">{location.hours.saturday}</div>
                              </>
                            )}
                            {location.hours.sunday !== "Closed" && (
                              <>
                                <div className="text-sm">Sunday</div>
                                <div className="text-sm">{location.hours.sunday}</div>
                              </>
                            )}
                          </div>

                          <div className="flex-1">
                            <div className="text-sm font-medium text-[#0066A4] mb-1">Address</div>
                            <div className="text-sm">{location.address}</div>
                            <div className="text-sm">{location.city}, {location.province}, {location.postalCode}</div>
                          </div>
                        </div>

                        <div className="mt-4">
                          <div className="text-sm font-medium text-[#0066A4] mb-1">Call Us</div>
                          <div className="text-sm">{location.phoneNumber}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

