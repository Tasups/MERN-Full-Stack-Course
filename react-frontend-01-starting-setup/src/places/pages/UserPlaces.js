import React from 'react'
import { useParams } from 'react-router-dom'

import PlaceList from '../components/PlaceList'

const DUMMY_PLACES = [
    {
      id: 'p1',
      title: 'Empire State Building',
      description: 'One of the most famous skyscrapers in the world.',
      imageUrl: "https://cdn.getyourguide.com/img/location/5ca3484e4fa26.jpeg/68.jpg", 
      address: "20 W 34th St., New York, NY 10001",
      location: {
        lat: 40.7484405,
        lng:73.9856644
      },
      creator: 'u1'
    },
    {
      id: 'p2',
      title: 'Emp. State Building',
      description: 'One of the most famous skyscrapers in the world.',
      imageUrl: "https://cdn.getyourguide.com/img/location/5ca3484e4fa26.jpeg/68.jpg", 
      address: "20 W 34th St., New York, NY 10001",
      location: {
        lat: 40.7484405,
        lng:73.9856644
      },
      creator: 'u2'
    },
    {
      id: 'p3',
      title: 'Empire State Building',
      description: 'One of the most famous skyscrapers in the world.',
      imageUrl: "https://cdn.getyourguide.com/img/location/5ca3484e4fa26.jpeg/68.jpg", 
      address: "20 W 34th St., New York, NY 10001",
      location: {
        lat: 40.7484405,
        lng:73.9856644
      },
      creator: 'u3'
    }
  ]

const UserPlaces = (props) => {
  const userId = useParams().userId
  const loadedPlaces = DUMMY_PLACES.filter(place => place.creator === userId)
  return(
    <PlaceList items={loadedPlaces} />
    )
}

export default UserPlaces