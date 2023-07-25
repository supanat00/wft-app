import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { preview } from '../assets';
import { getRandomPrompt } from '../utils';
import { FormField, Loader } from '../components';

const TranTexts = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    prompt: '',
    photo: '',
  });

  const [generatingImg, setGeneratingImg] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({ ...form, prompt: randomPrompt });
  };

  const handleTranTexts = async () => {
    if (form.prompt) {
      try {
        setLoading(true);
  
        const response = await fetch(
          //localhost
          'http://localhost:8080/api/v1/trantexts/translate'
          
          //render
          // 'https://backapi-ivar.onrender.com/api/v1/trantexts/translate'

          , {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ text: form.prompt, source: 'th', target: 'en' }),
        });
  
        if (response.ok) {
          const { translation } = await response.json();
          setForm({ ...form, prompt: translation });          
        } else {
          console.error('Something went wrong');
          alert('Something went wrong');
        }
      } catch (err) {
        console.error(err);
        alert('Something went wrong');
      } finally {
        setLoading(false);
      }
    } else {
      console.log('ไม่มีข้อมูล');
    }
  };
  

  const generateImage = async () => {
    if (form.prompt) {
      try {
        setGeneratingImg(true);
        const response = await fetch(
          
          //local
          'http://localhost:8080/api/v1/dalle'
          
          //render
          // 'https://backapi-ivar.onrender.com/api/v1/dalle'
          , {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            prompt: form.prompt,
          }),
        });

        const data = await response.json();
        setForm({ ...form, photo: `data:image/jpeg;base64,${data.photo}` });
      } catch (err) {
        alert(err);
      } finally {
        setGeneratingImg(false);
      }
    } else {
      alert('Please provide proper prompt');
    }
  };

  const handleGenerateTranTexts = async () => {
    if (form.prompt) {
      try {
        setLoading(true);
  
        const response = await fetch(
          //local
          'http://localhost:8080/api/v1/trantexts/translate'
          //render
          // 'https://backapi-ivar.onrender.com/api/v1/trantexts/translate'
          , {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ text: form.prompt, source: 'th', target: 'en' }),
        });
  
        if (response.ok) {
          const { translation } = await response.json();
  
          if (translation) {
            try {
              setGeneratingImg(true);
              const imageResponse = await fetch(
                //local
                'http://localhost:8080/api/v1/dalle'
                //render
                // 'https://backapi-ivar.onrender.com/api/v1/dalle'
                , {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  prompt: translation,
                }),
              });
  
              if (imageResponse.ok) {
                const imageData = await imageResponse.json();
                setForm({ ...form, photo: `data:image/jpeg;base64,${imageData.photo}` });
                } else {
                console.error('Something went wrong');
                alert('Something went wrong');
                }
                } catch (imageError) {
                console.error(imageError);
                alert('Something went wrong');
                } finally {
                setGeneratingImg(false);
                }
                } else {
                console.error('Translation not available');
                alert('Translation not available');
                }
                } else {
                console.error('Something went wrong');
                alert('Something went wrong');
                }
                } catch (err) {
                console.error(err);
                alert('Something went wrong');
                } finally {
                setLoading(false);
                }
                } else {
                console.log('No data provided');
                }
              
  };



  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.prompt && form.photo) {
      setLoading(true);
      try {
        const response = await fetch(
          //local
          'http://localhost:8080/api/v1/post'
          //render
          // 'https://backapi-ivar.onrender.com/api/v1/post'
          , {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ...form }),
        });

        await response.json();
        alert('Success');
        navigate('/');
      } catch (err) {
        alert(err);
      } finally {
        setLoading(false);
      }
    } else {
      alert('Please generate an image with proper details');
    }
  };

  return (
    <section className="max-w-7xl mx-auto">
      <div>
        <h1 className="font-extrabold text-[#222328] text-[32px]">TranTexts</h1>
        <p className="mt-2 text-[#666e75] text-[14px] max-w-[500px]">Generate an imaginative image through DALL-E AI and share it with the community</p>
      </div>

      <form className="mt-16 max-w-3xl" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-5">
          <FormField
            labelName="Your Name"
            type="text"
            name="name"
            placeholder="Ex.,john doe"
            value={form.name}
            handleChange={handleChange}
            />
            
            <FormField
            labelName="Prompt"
            type="text"
            name="prompt"
            placeholder="An Impressionist oil painting of sunflowers in a purple vase…"
            value={form.prompt}
            handleChange={handleChange}
            isSurpriseMe
            handleSurpriseMe={handleSurpriseMe}
            isTranTexts // เพิ่มตรงนี้เพื่อแสดงปุ่ม "Tran texts"
            handleTranTexts={handleTranTexts} // เพิ่มฟังก์ชัน handleTranTexts
          />
          

    
          <div className="relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 p-3 h-64 flex justify-center items-center">
            {form.photo ? (
              <img
                src={form.photo}
                alt={form.prompt}
                className="w-full h-full object-contain"
              />
            ) : (
              <img
                src={preview}
                alt="preview"
                className="w-9/12 h-9/12 object-contain opacity-40"
              />
            )}
    
            {generatingImg && (
              <div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg">
                <Loader />
              </div>
            )}
          </div>
        </div>
    
        <div className="mt-5 flex gap-5">
          <button
            type="button"
            onClick={generateImage}
            className="text-white bg-green-700 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            disabled={!form.prompt || generatingImg} // ปิดใช้งานปุ่มเมื่อไม่มี prompt หรือกำลังสร้างรูปภาพ
          >
            {generatingImg ? 'Generating...' : 'Generate'}
          </button>
          
          <button
            type="button"
            onClick={handleGenerateTranTexts}
            className="text-white bg-blue-500 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            disabled={!form.prompt || generatingImg}
          >
            GenerateTranTexts
          </button>

        </div>


    
        <div className="mt-10">
          <p className="mt-2 text-[#666e75] text-[14px]">
            ** Once you have created the image you want, you can share it with others in the community **
          </p>
          <button
            type="submit"
            className="mt-3 text-white bg-[#6469ff] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            {loading ? 'Sharing...' : 'Share with the Community'}
          </button>
        </div>
      </form>
    </section>
    );
  };

  export default TranTexts;