import React from 'react'
import Logo from './Logo'
import Hero from "./img/bg.png"
import axios from 'axios'
import { useState, useEffect } from 'react'
import Card from './Card'
export default function Home() {
    //my api url and keys
    let API_key="&api_key=502c3693ccf01e60e90e7122c2313b73"
    let base_url="https://api.themoviedb.org/3"
    let url=`${base_url}/discover/movie?sort_by=popularity.desc${API_key}`
    let genre=["popular", "kids", "action", "drama", "trending","sci-fi", "theatre"]

    //using my react hook to set up my api
    const [movies, setMovies] =useState([])
    const [url_setup, setUrl]=useState(url)
    const [filter, setFilter] =useState("")
    const[select, setSelect]=useState("popular")

    //useffect 
    useEffect(()=>{
      axios.get(url_setup).then((response)=>{
         setMovies(response.data.results)
        })
    },[url_setup])

    //filter movies by search
  const filterSearch=(e)=>{
    setFilter(e.target.value)
  }

  const searchMovie= (e) =>{
     if(e.key=="Enter"){
        url=`${base_url}/search/movie?api_key=502c3693ccf01e60e90e7122c2313b73&query=${filter}`
        setUrl(url)
        setFilter("")
     }
  }
  //filter movie by clicking  
  const getMovies= (genreType) =>{
    if(genreType==="popular"){
        url=`${base_url}/discover/movie?sort_by=popularity.desc${API_key}`
    }
    if(genreType==="trending"){
        url=`${base_url}/discover/movie/?certification_country=US&certification=R&sort_by=vote_average.desc${API_key}`
    }
    if(genreType==="theatre"){
        url=`${base_url}/discover/movie?primary_release_date.gte=2014-09-15&primary_release_date.lte=2014-10-22${API_key}`
    }
    if(genreType==="kids"){
        url=`${base_url}/discover/movie?certification_country=US&certification.lte=G&sort_by=popularity.desc${API_key}`
    }
    if(genreType==="drama"){
        url=`${base_url}/discover/movie?with_genres=18&primary_release_year=2014${API_key}`
    }
    if(genreType==="sci-fi"){
        url=`${base_url}/discover/movie?with_genres=878&with_cast=500&sort_by=vote_average.desc${API_key}`
    }
    setUrl(url)
  } 

  
  return (
    <div className='home'>
        <div className="nav">
            <Logo/>
        </div>
        <div className="hero-section" style={{backgroundImage:`url(${Hero})`}}>
            <div className="hero-content">
                <h1>
                    <span>Watch</span>
                    <span>something</span>
                    <span>incredible.</span>
                </h1>
            </div>
        </div>
        <div className="filter-bar">
            <label htmlFor="search">search</label>
            <input type="text" placeholder='enter to search..' id='search' value={filter} onChange={filterSearch} onKeyDown={searchMovie}/>
            {
                (movies.length===0)?<span className='error'>oops search result not found!</span>:""
            }
        </div>
        <div>
            <div className="card-main">
                <div>
                   {
                    genre.map((gen)=>{
                       return(
                        <span className='genre'>
                            <a href="#" name={gen} onClick={(e)=>{
                             e.preventDefault()
                             getMovies(e.target.name)
                             setSelect(gen)
                             }} className="genre-link">
                            {gen}
                            </a>
                        </span>
                       )
                    })
                   }
                    <p className='select'>{select}</p>
                </div>
                <div className='card-section'>
                    {
                        movies.filter(movie=>movie.poster_path).map((movie)=>{
                            return(
                            <div className="card-container">
                                <div className="card-item">
                                <Card 
                                    movie={movie}
                                />
                                </div>
                            </div>
                            )
                        })
                    }
                    <div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
