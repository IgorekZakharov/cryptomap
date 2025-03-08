'use client'

import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// Fix for default marker icons in Leaflet with Next.js
const icon = L.icon({
  iconUrl: '/images/marker-icon.png',
  iconRetinaUrl: '/images/marker-icon-2x.png',
  shadowUrl: '/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
})

type ExchangePoint = {
  id: string
  name: string
  type: 'ATM' | 'EXCHANGE'
  latitude: number
  longitude: number
  status: string
}

export default function Map() {
  const [userLocation, setUserLocation] = useState<[number, number]>([51.505, -0.09])
  const [exchangePoints, setExchangePoints] = useState<ExchangePoint[]>([])

  useEffect(() => {
    // Get user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation([position.coords.latitude, position.coords.longitude])
        },
        (error) => {
          console.error('Error getting location:', error)
        }
      )
    }

    // TODO: Fetch exchange points from API
    // This is example data
    setExchangePoints([
      {
        id: '1',
        name: 'Bitcoin ATM',
        type: 'ATM',
        latitude: 51.505,
        longitude: -0.09,
        status: 'ACTIVE'
      }
    ])
  }, [])

  return (
    <MapContainer
      center={userLocation}
      zoom={13}
      scrollWheelZoom={true}
      className="w-full h-[600px] rounded-lg"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {exchangePoints.map((point) => (
        <Marker
          key={point.id}
          position={[point.latitude, point.longitude]}
          icon={icon}
        >
          <Popup>
            <div className="text-sm">
              <h3 className="font-semibold">{point.name}</h3>
              <p className="text-gray-600">{point.type}</p>
              <p className={`text-sm ${
                point.status === 'ACTIVE' ? 'text-green-600' : 'text-red-600'
              }`}>
                {point.status}
              </p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
} 