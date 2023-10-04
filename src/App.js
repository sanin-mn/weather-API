import { CircularProgress, TextField } from '@mui/material';
import './App.css';
import { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';



function App() {
  const [cityName, setcityName] = useState("kochi")
  const [inputValue, setinputValue] = useState("")
  const [data, setData] = useState({})
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    AOS.init();
  }, [])

  useEffect(() => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?units=metric&q=${cityName}&appid=8ac5c4d57ba6a4b3dfcf622700447b1e`)
      .then((res) => {
        if (res.status === 200) {
          return res.json()
        } else {
          throw new Error("something went wrong")
        }
      })
      .then((data) => {
        setData(data)
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false))
  }, [cityName, error])

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      setcityName(e.target.value)
      setinputValue("")
    }
  }

  return (
    <div className='bg-img'>
      
      {
        !loading ? (
          
          <div className='border-box'>
            <TextField
              variant='filled'
              label='search Location'
              className='input'
              error={error}
              value={inputValue}
              onChange={(e) => setinputValue(e.target.value)}
              onKeyDown={handleSearch}
            ></TextField>

            <h3 className='city'>{data.name}</h3>
            <div className='group-temp'>
              <div className='group'>
                <img src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} alt="" />
                <h1>{data.weather[0].main}</h1>
              </div>
              <div className='disable' style={{width:'17rem'}}></div>
              <h1 className='temp'>{data.main.temp.toFixed()} °C</h1>
            </div>

            <div in={!loading}>
              <div className="box-container"  data-aos="zoom-out" data-aos-duration="1000">

                <div className="box">
                  <p>Humidity</p>
                  <h1>{data.main.humidity.toFixed()} %</h1>
                </div>

                <div className="box">
                  <p>Wind</p>
                  <h1>{data.wind.speed.toFixed()} km/h</h1>
                </div>

                <div className="box" >
                  <p>Feels Like</p>
                  <h1>{data.main.feels_like.toFixed()} °C</h1>
                </div>

              </div>
            </div>
          </div>
        ) : (
          <CircularProgress />
        )
      }
    </div>
  );
}

export default App;
