import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { preview } from '../assets';
import { getRandomPrompt } from '../utils';
import { Loader, PromptFormField } from '../components';

const TextsInput = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    prompt: '',
    photo: '',
    n1: '',
    n2: '',
    d1: '',
    w1: ''
  });
  

  const [generatingImg, setGeneratingImg] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };  

  const generateImage = async () => {
    if (form.prompt) {
      try {
        setGeneratingImg(true);
        const response = await fetch(
          
          // localhost
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
      alert('Please provide a proper prompt');
    }
  };

  const handleGenerateTranTexts = () => {
    setLoading(true);
  
    const randomPrompt = getRandomPrompt(form.prompt, form.n1, form.n2, form.d1, form.w1);
    const updatedForm = {
      ...form,
      prompt: randomPrompt,
      n1: '',
      n2: '',
      d1: '',
      w1: '',
    };
    setForm(updatedForm);
  
    setLoading(false);
    handleGenerateTranTexts();
  };  
  
  const handleGenerateTranTextsPrompt = async () => {
    if (form.n1 && form.n2 && form.d1 && form.w1) {
      try {
        setLoading(true);
  
        const textsToTranslate = [form.n1, form.n2, form.d1, form.w1];
        const translations = [];
  
        for (const text of textsToTranslate) {
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
            body: JSON.stringify({ text, source: 'th', target: 'en' }),
          });
  
          if (response.ok) {
            const { translation } = await response.json();
            translations.push(translation);
          } else {
            console.error('Something went wrong');
            alert('Something went wrong');
            return;
          }
        }
  
        const randomPrompt = getRandomPrompt(form.prompt, translations[0], translations[1], translations[2], translations[3]);
  
        const updatedForm = {
          ...form,
          prompt: randomPrompt,
          n1: '',
          n2: '',
          d1: '',
          w1: '',
        };
  
        setForm(updatedForm);
  
        if (randomPrompt) {
          try {
            setGeneratingImg(true);
            const response = await fetch(
              
              //localhost
              'http://localhost:8080/api/v1/dalle'
              
              //render
              // 'https://backapi-ivar.onrender.com/api/v1/dalle'
              
              , {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                prompt: randomPrompt,
              }),
            });
  
            const data = await response.json();
            setForm({ ...updatedForm, photo: `data:image/jpeg;base64,${data.photo}` });
          } catch (err) {
            alert(err);
          } finally {
            setGeneratingImg(false);
          }
        } else {
          alert('Please provide a proper prompt');
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
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.prompt && form.photo) {
      setLoading(true);
      try {
        const response = await fetch(
          //localhost
          'http://localhost:8080/api/v1/post'
          
          //reander
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
        <h1 className="font-extrabold text-[#222328] text-[32px]">Texts Input</h1>
        <p className="mt-2 text-[#666e75] text-[14px] max-w-[500px]">
          Generate an imaginative image through DALL-E AI and share it with the community
        </p>
      </div>

      <form className="mt-16 max-w-3xl" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-5">          

          <div className="flex gap-2">
            <PromptFormField
              labelName="Name(1)"
              type="text"
              name="n1"
              value={form.n1 || ''}
              handleChange={handleChange}
              placeholder="Dog"
            />

            <PromptFormField
              labelName="Name(2)"
              type="text"
              name="n2"
              value={form.n2 || ''}
              handleChange={handleChange}
              placeholder="Cat"
            />

            <PromptFormField
              labelName="Do"
              type="text"
              name="d1"
              value={form.d1 || ''}
              handleChange={handleChange}
              placeholder="Run"
            />

            <PromptFormField
              labelName="Where"
              type="text"
              name="w1"
              value={form.w1 || ''}
              handleChange={handleChange}
              placeholder="Sea"
            />
          </div>

          <PromptFormField
              disabled={true}
              labelName="Prompt"
              type="text"
              name="prompt"
              value={form.prompt}
              handleChange={handleChange}
              placeholder="Enter prompt"
          />

          <div className="relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 p-3 h-64 flex justify-center items-center">
            {form.photo ? (
              <img src={form.photo} alt={form.prompt} className="w-full h-full object-contain" />
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
            disabled={!form.prompt || generatingImg}
          >
            {generatingImg ? 'Generating...' : 'Generate'}
          </button>

          <button
            type="button"
            onClick={handleGenerateTranTexts}            
            className="text-white bg-blue-500 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            disabled={!form.n1 || !form.n2 || !form.d1 || !form.w1 || generatingImg}
          >
            Apply
          </button>

          <button
            type="button"
            onClick={handleGenerateTranTextsPrompt}
            className="text-white bg-blue-500 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            disabled={!form.n1 || !form.n2 || !form.d1 || !form.w1 || generatingImg}
          >
            Trantexts&Generate
          </button>
        </div>
      </form>
    </section>
  );
};

export default TextsInput;

