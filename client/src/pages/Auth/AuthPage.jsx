import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Eye, EyeOff, LockKeyhole, Mail } from 'lucide-react'
import SiteFooter from '@/components/layout/SiteFooter'
import NavbarSection from '@/pages/Home/components/NavbarSection'
import { useLoginMutation } from '@/hooks/useAuthQueries'
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

  const loginMutation = useLoginMutation()

  const [loginForm, setLoginForm] = useState(initialLoginState)
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  useEffect(() => {
    if (session?.accessToken) {
      navigate('/dashboard', { replace: true })
    }
  }, [navigate, session])

  const onLoginChange = (event) => {
    const { name, value } = event.target
    setLoginForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleLogin = (event) => {
    event.preventDefault()
    setError('')

    loginMutation.mutate(loginForm, {
      onSuccess: (response) => {
        setAuth({
          user: response.data?.user ?? null,
          session: response.data?.session ?? null,
        })

        setLoginForm(initialLoginState)
        navigate('/dashboard', { replace: true })
      },
      onError: (requestError) => {
        setError(requestError.message)
      },
    })
  }

  return (
    <div className='min-h-screen bg-white font-["Poppins","Segoe_UI",sans-serif] text-[#121521]'>
      <div className='relative'>
        <NavbarSection />
        <section className='border-b border-[#e8edf6] bg-white px-4 pb-7 pt-24 md:px-6 md:pb-8 md:pt-28'>
          <div className='mx-auto max-w-[1280px]'>
            <div className='mx-auto max-w-[640px] text-center'>
              <span className='inline-flex items-center rounded-full border border-[#dbe4f3] bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-[#3a538a]'>
                Dashboard Access
              </span>
              <h1 className='mt-3 text-[38px] font-extrabold tracking-[-0.03em] text-[#111318] md:text-[44px]'>
                {t('auth.heading')}
              </h1>
              <p className='mt-2 text-[16px] text-[#66758f] md:text-[17px]'>
                {t('auth.subtitle')}
              </p>
            </div>
          </div>
        </section>
      </div>

      <section className='bg-white px-4 py-12 md:px-6 md:py-14'>
        <div className='mx-auto max-w-[1280px]'>
          <article className='mx-auto max-w-[640px] rounded-[24px] border border-[#d8e0ee] bg-white p-6 shadow-[0_24px_50px_-22px_rgba(7,21,68,0.22)] md:p-9'>
              <div className='mb-6 flex items-center justify-between border-b border-[#ebf0f8] pb-5'>
                <div>
                  <h3 className='text-[31px] font-extrabold tracking-[-0.03em] text-[#111318] md:text-[34px]'>
                    {t('auth.welcome')}
                  </h3>
                  <p className='mt-1 text-[14px] text-[#6a7690]'>
                    Sign in with your registered account
                  </p>
                </div>
                <span className='rounded-full border border-[#d7e1f5] bg-[#f4f8ff] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[#2b4faa]'>
                  Secure
                </span>
              </div>

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
                  <div className='group flex h-12 items-center gap-3 rounded-[12px] border border-[#dde5f1] bg-[#f8faff] px-4 transition focus-within:border-[#96ace0] focus-within:bg-white focus-within:shadow-[0_0_0_4px_rgba(53,103,196,0.12)]'>
                    <Mail className='h-4 w-4 shrink-0 text-[#7e8ca8] transition group-focus-within:text-[#2d4f9f]' />
                    <input
                      required
                      type='email'
                      name='email'
                      value={loginForm.email}
                      onChange={onLoginChange}
                      placeholder={t('auth.emailPlaceholder')}
                      className='h-full w-full bg-transparent text-[15px] text-[#111318] outline-none placeholder:text-[#98a4ba]'
                    />
                  </div>
                </div>

                <div>
                  <label className='mb-2 block text-[14px] font-semibold text-[#1a2333]'>
                    {t('auth.password')}
                  </label>
                  <div className='group flex h-12 items-center gap-3 rounded-[12px] border border-[#dde5f1] bg-[#f8faff] px-4 transition focus-within:border-[#96ace0] focus-within:bg-white focus-within:shadow-[0_0_0_4px_rgba(53,103,196,0.12)]'>
                    <LockKeyhole className='h-4 w-4 shrink-0 text-[#7e8ca8] transition group-focus-within:text-[#2d4f9f]' />
                    <input
                      required
                      type={showPassword ? 'text' : 'password'}
                      name='password'
                      value={loginForm.password}
                      onChange={onLoginChange}
                      placeholder={t('auth.passwordPlaceholder')}
                      className='h-full w-full bg-transparent text-[15px] text-[#111318] outline-none placeholder:text-[#98a4ba]'
                    />
                    <button
                      type='button'
                      onClick={() => setShowPassword((prev) => !prev)}
                      className='inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[#70809e] transition hover:bg-[#ecf2ff] hover:text-[#2d4f9f]'
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? <EyeOff className='h-4 w-4' /> : <Eye className='h-4 w-4' />}
                    </button>
                  </div>
                </div>

                <button
                  disabled={loginMutation.isPending}
                  type='submit'
                  className='inline-flex h-12 w-full items-center justify-center rounded-[12px] bg-[#2b4faa] px-8 text-[15px] font-semibold text-white shadow-[0_10px_22px_-10px_rgba(43,79,170,0.7)] transition hover:translate-y-[-1px] hover:bg-[#244599] disabled:cursor-not-allowed disabled:opacity-70'
                >
                  {loginMutation.isPending ? t('common.actions.signingIn') : t('common.actions.signIn')}
                </button>
              </form>

              <Link
                to='/'
                className='mt-6 inline-flex h-11 items-center justify-center rounded-[10px] border border-[#d7deea] px-5 text-[14px] font-semibold text-[#1f3f97] transition hover:border-[#c6d3ea] hover:bg-[#f4f7ff]'
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
