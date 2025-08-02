import { Brain } from 'lucide-react' 

 

export default function Loading() { 

  return ( 

    <div className="min-h-screen bg-black flex items-center justify-center"> 

      <div className="text-center"> 

        {/* Animated Background */} 

        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-purple-500/10 to-pink-500/10 animate-pulse"></div> 

         

        {/* Loading Content */} 

        <div className="relative z-10"> 

          {/* Animated Icon */} 

          <div className="mb-8"> 

            <div className="relative mx-auto w-20 h-20 rounded-full bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center border border-cyan-500/30 animate-pulse"> 

              <Brain size={40} className="text-cyan-400 animate-pulse" /> 

              <div className="absolute inset-0 rounded-full border-2 border-cyan-500/30 animate-spin"></div> 

            </div> 

          </div> 

 

          {/* Loading Text */} 

          <h2 className="text-xl font-bold text-cyan-400 mb-4 font-mono animate-pulse"> 

            [INITIALIZING NEURAL INTERFACE] 

          </h2> 

           

          {/* Loading Dots */} 

          <div className="flex justify-center space-x-1 mb-4"> 

            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div> 

            <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div> 

            <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div> 

          </div> 

 

          {/* Status Text */} 

          <p className="text-gray-400 text-sm font-mono"> 

            Connecting to productivity matrix... 

          </p> 

        </div> 

      </div> 

    </div> 

  ) 

} 

 