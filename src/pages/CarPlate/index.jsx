import { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

const getFakeImage = (ts) => `https://fakeimg.pl/640x300/?text=${ts}&font=lobster&font_size=30`

const defaultValues = {
  url: getFakeImage(Date.now()),
  isStart: false
}

let timer

const CarPlate = () => {
  const method = useForm({ defaultValues })
  const isStart = method.watch('isStart')
  const imageUrl = method.watch('url')

  const onStart = () => method.setValue('isStart', true)

  const onStop = () => method.setValue('isStart', false)

  useEffect(() => {
    if (!isStart) {
      clearInterval(timer)
      return
    }

    timer = setInterval(() => {
      method.setValue('url', getFakeImage(Date.now()))
    }, 3000)
    return () => {
      clearInterval(timer)
    }
  }, [method, isStart])

  return (
    <div className='space-y-2'>
      <FormProvider {...method}>
        <form>
          <input {...method.register('url')} placeholder='image url' className='input input-bordered w-full' disabled={isStart} />
        </form>
      </FormProvider>
      <div className='flex flex-row space-x-2'>
        <button className='btn' onClick={onStart} disabled={isStart}>
          Start
        </button>
        <button className='btn' onClick={onStop} disabled={!isStart}>
          Stop
        </button>
      </div>
      <div className='skeleton h-64 w-full rounded-md text-transparent'>
        <img src={imageUrl} className='size-full rounded-md object-cover' alt='car plate image' />
      </div>
      <div>
        <table className='table'>
          <thead>
            <tr>
              <th>
                Date
              </th>
              <th>
                Car Plate
              </th>
              <th>
                Image
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                2024/09/20
              </td>
              <td>
                111
              </td>
              <td>
                <div className='skeleton h-32 rounded-md text-transparent'>
                  <img src='https://fakeimg.pl/640x300/?text=1727442453477&font=lobster&font_size=30' className='size-full rounded-md object-cover' alt='car plate image' />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default CarPlate
