'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { Icon } from 'leaflet'

// Dynamically import the map component to avoid SSR issues
const Map = dynamic(() => import('@/components/Map'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[600px] bg-gray-100 animate-pulse rounded-lg"></div>
  ),
})

export default function Home() {
  return (
    <div className="space-y-8">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
          Find Crypto Exchanges & ATMs Worldwide
        </h1>
        <p className="mt-6 text-lg leading-8 text-gray-600">
          Locate the nearest cryptocurrency exchange points and ATMs wherever you are.
          Get real-time rates, reviews, and directions.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Map />
        </div>
        <div className="space-y-4">
          <div className="bg-white shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-base font-semibold leading-6 text-gray-900">
                Filter Exchange Points
              </h3>
              <div className="mt-2 max-w-xl text-sm text-gray-500">
                <p>Select the type of exchange points you want to see on the map.</p>
              </div>
              <div className="mt-5">
                <div className="space-y-4">
                  <div className="flex items-center">
                    <input
                      id="exchanges"
                      name="exchanges"
                      type="checkbox"
                      defaultChecked
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                    <label htmlFor="exchanges" className="ml-3 text-sm font-medium text-gray-900">
                      Exchanges
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="atms"
                      name="atms"
                      type="checkbox"
                      defaultChecked
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                    <label htmlFor="atms" className="ml-3 text-sm font-medium text-gray-900">
                      ATMs
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Nearby Exchange Points
              </h3>
            </div>
            <div className="border-t border-gray-200">
              <div className="divide-y divide-gray-200">
                {/* Example exchange point - this will be dynamically populated */}
                <div className="px-4 py-4 sm:px-6 hover:bg-gray-50 cursor-pointer">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-indigo-600 truncate">
                      Example Exchange
                    </p>
                    <div className="ml-2 flex-shrink-0 flex">
                      <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Active
                      </p>
                    </div>
                  </div>
                  <div className="mt-2 sm:flex sm:justify-between">
                    <div className="sm:flex">
                      <p className="flex items-center text-sm text-gray-500">
                        1.2 km away
                      </p>
                    </div>
                    <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                      <p>
                        ⭐️ 4.5 (24 reviews)
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
