import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getCollections } from "../../store/collections"
import SingleCollection from "./SingleCollection"

function Collection() {
  const collections = useSelector(state => state.collections)
  const dispatch = useDispatch()

  const [currentCollection, setCurrentCollection] = useState(null)

  useEffect(() => {
    dispatch(getCollections())
  },[])

  return (
    <div>
      <div>
        {collections && Object.keys(collections).map(child => {
          return (
            <li onClick={e => setCurrentCollection(() => child)} key={collections[child]?.name}>{collections[child]?.name}</li>
          )
        })}
      </div>
      {currentCollection && <SingleCollection  collection={collections[currentCollection]}/>}
    </div>
  )
}

export default Collection
