import React, { useState } from 'react'

interface Props {
  locations: {
    city_name: string
  }[]
  handleClose: () => void
  handleSelect: (loc: string) => void
}

const LocationList = ({ locations, handleClose, handleSelect }: Props) => {
  const [search, setSearch] = useState<string>('')
  const filter = locations.filter((location) => location.city_name.toLowerCase().includes(search.toLowerCase()))
  return (
    <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-black bg-opacity-35">
      <div className="flex items-center justify-center w-full h-full max-w-xl">
        <div className="flex flex-col items-start w-5/6 mx-auto overflow-y-auto bg-white rounded h-5/6">
          <div className="sticky top-0 flex items-center w-full gap-2 px-2 py-2 my-3 bg-white">
            <input
              type="text"
              className="outline-none border border-[#8A8A8A] w-full rounded py-1 px-3"
              placeholder="Search location..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button onClick={handleClose} className="bg-[#FE2C55] py-1 text-white font-semibold rounded px-3">
              batal
            </button>
          </div>
          {filter.map((location, index) => (
            <button
              onClick={() => handleSelect(location.city_name)}
              type="button"
              key={index}
              className="border-b border-b-[#S8A8A8A] w-full py-2 text-start px-2"
            >
              {location.city_name}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default LocationList
