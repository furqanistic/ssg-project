import React from 'react'

const HukamnamaSection = () => {
  return (
    <section className='bg-[#f2f2f2] px-4 py-8 md:px-6 md:py-10'>
      <div className='mx-auto w-full max-w-[1280px] rounded-[14px] border border-[#d2d6df] bg-[#eceff4] px-5 py-6 text-[#48566d] md:px-9 md:py-8'>
        <h2 className='text-[18px] font-extrabold tracking-[-0.02em] text-[#1e3a8a] md:text-[24px]'>
          Today&apos;s Hukamnama
        </h2>

        <div className='mt-8 text-center text-[#16191f]'>
          <p className='text-[20px] font-medium leading-[1.2] md:text-[34px]'>
            ਸਲੋਕ ਮਹਲਾ ੩ ॥
          </p>
          <p className='mt-2 text-[18px] font-normal leading-[1.3] md:text-[30px]'>
            ਸਭਨਾ ਕਾ ਦਾਤਾ ਏਕੁ ਹੈ ਦੂਜਾ ਨਾਹੀ ਕੋਇ ॥
          </p>
        </div>

        <div className='mt-6 border-t border-[#d0d4dd]' />

        <div className='mt-6 space-y-5'>
          <div>
            <p className='text-[17px] font-bold text-[#56647c] md:text-[18px]'>
              Transliteration:
            </p>
            <p className='mt-1.5 text-[16px] italic leading-[1.45] text-[#4a5870] md:text-[18px]'>
              Salok Mehalā 3 ||
              <br />
              Sabhnā kā dātā ek hai, dūjā nāhī ko-i ||
            </p>
          </div>

          <div>
            <p className='text-[17px] font-bold text-[#56647c] md:text-[18px]'>
              Translation:
            </p>
            <p className='mt-1.5 text-[16px] leading-[1.45] text-[#4a5870] md:text-[18px]'>
              There is only One Giver for all; there is no other at all.
            </p>
          </div>
        </div>

        <div className='mt-7 text-center'>
          <button
            type='button'
            className='text-[16px] font-bold text-[#f6ab3c] transition hover:text-[#ef9f24] md:text-[18px]'
          >
            View Full Hukamnama →
          </button>
        </div>
      </div>
    </section>
  )
}

export default HukamnamaSection
