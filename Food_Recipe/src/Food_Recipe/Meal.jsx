import React, { useEffect, useState } from 'react';
import './Meal.css';

const Meal = () => {
    const [mealdata, setMealdata] = useState([]);
    const [area, setArea] = useState('Indian');
    const [inputdata, setInputdata] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const api = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`);
            const data = await api.json();
            console.log(data.meals);
            setMealdata(data.meals);
        };
        fetchData();
    }, [area]); // Run effect whenever area changes

    const submitHandler = async (e) => {
        e.preventDefault();
        const fetchData = async () => {
            const api = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${inputdata}`);
            const data = await api.json();
            console.log("Search Data=", data.meals);
            setMealdata(data.meals);
        }
        fetchData(); // Call the function here
    }

    return (
        <>
            <div className='my-3' style={{ width: '1000px', margin: 'auto' }}>
                <div className='mx-auto text-center'>
                    <button onClick={() => setArea('Indian')} type="button" className="btn btn-outline-secondary mx-3">Indian</button>
                    <button onClick={() => setArea('Canadian')} type="button" className="btn btn-outline-primary mx-3">Canadian</button>
                    <button onClick={() => setArea('American')} type="button" className="btn btn-outline-success mx-3">American</button>
                    <button onClick={() => setArea('Thai')} type="button" className="btn btn-outline-danger mx-3">Thai</button>
                    <button onClick={() => setArea('British')} type="button" className="btn btn-outline-warning mx-3">British</button>
                    <button onClick={() => setArea('Russian')} type="button" className="btn btn-outline-info mx-3">Russian</button>
                </div>
            </div>
            <form onSubmit={submitHandler} className='mx-auto text-center my-3'>
                <input
                    onChange={(e) => setInputdata(e.target.value)} // Corrected here
                    type="text"
                    placeholder='Search'
                />
            </form>
            <div className='meal-container' style={{
                display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap',
                margin: 'auto', marginTop: '1.5rem'
            }}>
                {mealdata && mealdata.map((data) => (
                    <div key={data.idMeal} className='meal-card'>
                        <div style={{ padding: '20px' }}>
                            <img src={data.strMealThumb} alt="MealImage" className='meal-image' />
                        </div>
                        <h4>{data.strMeal}</h4>
                    </div>
                ))}
            </div>
        </>
    );
}

export default Meal;
