import { login } from './actions'
import { LogIn, AlertCircle } from 'lucide-react'

// Next.js 16 requires searchParams to be treated as a Promise in Server Components
export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const params = await searchParams
  const error = params?.error as string | undefined

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-slate-800/80 backdrop-blur-xl p-10 rounded-2xl border border-slate-700 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent opacity-50"></div>
        <div className="absolute -right-10 -top-10 w-32 h-32 bg-[#d4af37]/10 rounded-full blur-2xl pointer-events-none"></div>
        
        <div className="text-center relative z-10">
          <div className="inline-flex items-center justify-center p-3 bg-slate-900 rounded-full mb-4 border border-[#d4af37]/30 shadow-inner">
            <LogIn className="w-8 h-8 text-[#d4af37]" />
          </div>
          <h2 className="mt-2 text-3xl font-playfair font-bold text-white tracking-wide">
            Executive Login
          </h2>
          <p className="mt-2 text-sm text-slate-400 font-light">
            Silakan masuk untuk mengakses dasbor admin
          </p>
        </div>

        {error && (
          <div className="bg-red-900/30 border border-red-500/50 rounded-lg p-4 flex items-center text-red-200 text-sm mt-4 relative z-10 animate-fade-in-up">
            <AlertCircle className="w-5 h-5 mr-3 flex-shrink-0 text-red-400" />
            <span>{error}</span>
          </div>
        )}

        <form className="mt-8 space-y-6 relative z-10" action={login}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-1">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="appearance-none relative block w-full px-4 py-3 border border-slate-600 bg-slate-900/50 placeholder-slate-500 text-white rounded-xl focus:outline-none focus:ring-1 focus:ring-[#d4af37] focus:border-[#d4af37] focus:z-10 sm:text-sm transition-colors"
                placeholder="admin@example.com"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-300 mb-1">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none relative block w-full px-4 py-3 border border-slate-600 bg-slate-900/50 placeholder-slate-500 text-white rounded-xl focus:outline-none focus:ring-1 focus:ring-[#d4af37] focus:border-[#d4af37] focus:z-10 sm:text-sm transition-colors"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-xl text-slate-900 bg-[#d4af37] hover:bg-[#ebd074] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-[#d4af37] shadow-[0_0_15px_rgba(212,175,55,0.2)] transition-all duration-300 uppercase tracking-wider mt-6"
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
