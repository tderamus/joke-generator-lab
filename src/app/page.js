'use client';

import { useState } from 'react';
import { Card } from 'react-bootstrap';

function Home() {
  const [jokeSetup, setJokeSetup] = useState('');
  const [jokeDelivery, setJokeDelivery] = useState('');
  const [jokeBtnText, setJokeBtnText] = useState('GET A JOKE');

  const getJoke = async () => {
    const response = await fetch(' https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=twopart');
    const randomJoke = await response.json();
    setJokeSetup(randomJoke.setup);
    setJokeDelivery(randomJoke.delivery);
  };

  const handleClick = () => {
    if (jokeBtnText === 'GET A JOKE') {
      getJoke();
      setJokeBtnText('GET PUNCHLINE');
    } else if (jokeBtnText === 'GET PUNCHLINE') {
      setJokeBtnText('GET ANOTHER JOKE');
    } else if (jokeBtnText === 'GET ANOTHER JOKE') {
      setJokeSetup('');
      setJokeDelivery('');
      setJokeBtnText('GET PUNCHLINE');
      getJoke();
    }
  };

  return (
    <>
      <div>
        <Card style={{ width: '18rem' }}>
          <Card.Body>
            <Card.Text>{jokeSetup} </Card.Text>
            {jokeBtnText === 'GET ANOTHER JOKE' && <Card.Text>{jokeDelivery} </Card.Text>}
          </Card.Body>
        </Card>
      </div>
      <button className="btn btn-success joke" type="button" onClick={handleClick}>
        {jokeBtnText}
      </button>
    </>
  );
}

export default Home;
