import React from 'react'

export default function Card({movie}) {
    let img_path="https://image.tmdb.org/t/p/w500"
  return (
      <div className='movie-container'key={movie.id}>
         <div className='details'>
           <img src={img_path+movie.poster_path} alt={movie.title} className='img' />
            <div className="box">
                <h2 className='movie-name'>
                    {movie.title}
                    <button>download</button>
                </h2>
            </div>
         </div>
      </div>
  )
}
