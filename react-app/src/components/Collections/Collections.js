import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getCollections } from "../../store/collections"
import DeleteCollection from "./CollectionDelete"
import SingleCollection from "./SingleCollection"
import UpdateCFormModal from "./UpdateCollection"

function Collection() {
  const collections = useSelector(state => state.collections)
  const dispatch = useDispatch()

  const [currentCollection, setCurrentCollection] = useState(null)
  // console.log(collections)

  useEffect(() => {
    dispatch(getCollections())
  },[dispatch])

  return (
    <div>
      <div>
        {collections && Object.keys(collections).map(child => {
          return (
            <li onClick={e => setCurrentCollection(() => child)} key={collections[child]?.name}>{collections[child]?.name}</li>
            )
          })}
          <UpdateCFormModal collection={collections[currentCollection]}/>
          <DeleteCollection collection={collections[currentCollection]}/>
      </div>
      {currentCollection && <SingleCollection  collection={collections[currentCollection]}/>}
    </div>
  )
}

export default Collection
