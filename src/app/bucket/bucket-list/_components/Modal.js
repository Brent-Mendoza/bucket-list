"use client"
import { Button } from "@/components/ui/button"
import {
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent } from "@radix-ui/react-dialog"
import { LocateIcon } from "lucide-react"
import React, { useState } from "react"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import "leaflet/dist/leaflet.css"

const Modal = ({ setLocation }) => {
  const [search, setSearch] = useState("")
  const [coords, setCoords] = useState(null)

  const searchLocation = async () => {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
        search
      )}&format=json&limit=1`
    )
    const data = await res.json()
    if (data[0]) {
      const { lat, lon, display_name } = data[0]
      setCoords({
        lat: parseFloat(lat),
        lng: parseFloat(lon),
        name: display_name,
      })
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="flex gap-2 bg-outerspace shdow-md rounded-md px-2 self-end text-neutral-300 cursor-pointer hover:scale-110 duration-300 ease-linear active:scale-95">
          <LocateIcon /> Location
        </button>
      </DialogTrigger>
      <DialogContent className="w-100 bg-white p-4 rounded-xl shadow-xl">
        <DialogHeader>
          <DialogTitle>Add location</DialogTitle>
          <DialogDescription>Shows the location in a map.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          <div className="grid gap-3">
            <Label className="mt-2">Location</Label>
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Enter location..."
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault()
                  searchLocation()
                }
              }}
            />
          </div>
        </div>
        <DialogFooter className="mt-2">
          <DialogClose asChild>
            <Button variant="outline" className="cursor-pointer">
              Cancel
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              type="button"
              className="cursor-pointer"
              onClick={() => {
                if (coords) setLocation(coords)
              }}
            >
              Save
            </Button>
          </DialogClose>
        </DialogFooter>
        {coords && (
          <MapContainer
            center={[coords.lat, coords.lng]}
            zoom={13}
            scrollWheelZoom={false}
            style={{ height: "250px", width: "100%" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://carto.com/">CARTO</a> contributors'
              url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
            />
            <Marker position={[coords.lat, coords.lng]}>
              <Popup>{coords.name}</Popup>
            </Marker>
          </MapContainer>
        )}
      </DialogContent>
    </Dialog>
  )
}

export default Modal
