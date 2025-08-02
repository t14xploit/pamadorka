import Link from 'next/link' 

import { Brain, ArrowLeft } from 'lucide-react' 

 

export default function NotFound() { 

  return ( 

    <div className="min-h-screen bg-black flex items-center justify-center p-4"> 

      <div className="text-center max-w-md"> 

        {/* Animated Background */} 

        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-purple-500/10 to-pink-500/10 animate-pulse"></div> 

         

        {/* Content */} 

        <div className="relative z-10"> 

          {/* Icon */} 

          <div className="mb-8"> 

            <div className="relative mx-auto w-24 h-24 rounded-full bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center border border-cyan-500/30"> 

              <Brain size={48} className="text-cyan-400" /> 

              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-500/10 to-purple-500/10 animate-pulse"></div> 

            </div> 

          </div> 

 

          {/* Error Code */} 

          <h1 className="text-6xl font-bold text-cyan-400 mb-4 font-mono">404</h1> 

           

          {/* Error Message */} 

          <h2 className="text-2xl font-bold text-white mb-4 font-mono"> 

            [NEURAL LINK DISCONNECTED] 

          </h2> 

           

          <p className="text-gray-400 mb-8 font-mono"> 

            The requested neural pathway could not be found in the matrix. 

            <br /> 

            Please return to the main interface. 

          </p> 

 

          {/* Action Button */} 

          <Link 

            href="/" 

            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500/20 to-purple-500/20  

                     border border-cyan-500/30 rounded-lg text-cyan-400 hover:text-white  

                     transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/25 

                     backdrop-blur-sm font-mono" 

          > 

            <ArrowLeft size={20} /> 

            Return to Neural Interface 

          </Link> 

 

          {/* Additional Info */} 

          <div className="mt-8 text-xs text-gray-500 font-mono"> 

            Error Code: NEURAL_PATH_NOT_FOUND 

            <br /> 

            Timestamp: {new Date().toISOString()} 

          </div> 

        </div> 

      </div> 

    </div> 

  ) 

} 