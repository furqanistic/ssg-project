import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import SiteFooter from '@/components/layout/SiteFooter'
import NavbarSection from '@/pages/Home/components/NavbarSection'
import { loginRequest } from '@/services/authApi'
import { useAuthStore } from '@/store/authStore'

const initialLoginState = {
  email: '',
  password: '',
}

const AuthPage = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const setAuth = useAuthStore((state) => state.setAuth)
  const session = useAuthStore((state) => state.session)

  const [loginForm, setLoginForm] = useState(initialLoginState)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (session?.accessToken) {
      navigate('/dashboard', { replace: true })
    }
  }, [navigate, session])

  const onLoginChange = (event) => {
    const { name, value } = event.target
    setLoginForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const response = await loginRequest(loginForm)

      setAuth({
        user: response.data?.user ?? null,
        session: response.data?.session ?? null,
      })

      setLoginForm(initialLoginState)
      navigate('/dashboard', { replace: true })
    } catch (requestError) {
      setError(requestError.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='min-h-screen bg-[#f4f7ff] font-["Poppins","Segoe_UI",sans-serif] text-[#121521]'>
      <div className='relative'>
        <NavbarSection />
        <section className='bg-[#2b4faa] px-4 pb-14 pt-28 text-white md:px-6 md:pb-16 md:pt-34'>
          <div className='mx-auto max-w-[1280px]'>
            <div className='max-w-[760px]'>
              <h1 className='text-[38px] font-extrabold tracking-[-0.03em] md:text-[44px]'>
                {t('auth.heading')}
              </h1>
              <p className='mt-3 text-[17px] text-white/90 md:text-[18px]'>
                {t('auth.subtitle')}
              </p>
            </div>
          </div>
        </section>
      </div>

      <section className='px-4 py-14 md:px-6 md:py-16'>
        <div className='mx-auto w-full max-w-[620px]'>
          <article className='rounded-[18px] border border-[#d8dfeb] bg-white p-6 shadow-[0_6px_20px_rgba(18,33,70,0.06)] md:p-8'>
            <h2 className='text-[28px] font-extrabold tracking-[-0.03em] text-[#111318] md:text-[32px]'>
              {t('auth.welcome')}
            </h2>
            <p className='mt-2 text-[15px] text-[#5f6c87]'>
              {t('auth.credentials')}
            </p>

            {error ? (
              <p className='mt-5 rounded-[10px] border border-[#f2b5b5] bg-[#fff0f0] px-4 py-3 text-[14px] font-medium text-[#a32020]'>
                {error}
              </p>
            ) : null}

            <form className='mt-6 space-y-5' onSubmit={handleLogin}>
              <div>
                <label className='mb-2 block text-[14px] font-semibold text-[#1a2333]'>
                  {t('auth.email')}
                </label>
                <input
                  required
                  type='email'
                  name='email'
                  value={loginForm.email}
                  onChange={onLoginChange}
                  placeholder={t('auth.emailPlaceholder')}
                  className='h-12 w-full rounded-[10px] border border-[#e2e7f0] bg-[#f8faff] px-4 text-[15px] text-[#111318] outline-none transition focus:border-[#9bb0e1]'
                />
              </div>

              <div>
                <label className='mb-2 block text-[14px] font-semibold text-[#1a2333]'>
                  {t('auth.password')}
                </label>
                <input
                  required
                  type='password'
                  name='password'
                  value={loginForm.password}
                  onChange={onLoginChange}
                  placeholder={t('auth.passwordPlaceholder')}
                  className='h-12 w-full rounded-[10px] border border-[#e2e7f0] bg-[#f8faff] px-4 text-[15px] text-[#111318] outline-none transition focus:border-[#9bb0e1]'
                />
              </div>

              <button
                disabled={isLoading}
                type='submit'
                className='inline-flex h-12 w-full items-center justify-center rounded-[12px] bg-[#2b4faa] px-8 text-[15px] font-semibold text-white transition hover:bg-[#244599] disabled:cursor-not-allowed disabled:opacity-70'
              >
                {isLoading ? t('common.actions.signingIn') : t('common.actions.signIn')}
              </button>
            </form>

            <Link
              to='/'
              className='mt-6 inline-flex h-11 items-center justify-center rounded-[10px] border border-[#d7deea] px-5 text-[14px] font-semibold text-[#1f3f97] transition hover:bg-[#f4f7ff]'
            >
              {t('common.actions.backToHome')}
            </Link>
          </article>
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}

export default AuthPage
