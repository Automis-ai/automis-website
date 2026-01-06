"use client";
import React, { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';

const WaveformPlayer = ({
  audioSrc = 'assets/audio/Audio_AI_bubble.IT.mp3',
  waveColor = '#3C91E6',
  progressColor = '#FEC458',
  height = 100,
  barWidth = 2,
  cursorColor = '#FEC458',
  cursorWidth = 0,
  title = "Ascolta l'AI in azione!"
}) => {
  const waveformRef = useRef(null);
  const waveSurferRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    let isDestroyed = false;

    const initializeWaveSurfer = async () => {
      if (waveSurferRef.current) {
        try {
          waveSurferRef.current.destroy();
          waveSurferRef.current = null;
        } catch (error) {
          console.error('Error destroying existing WaveSurfer instance:', error);
        }
      }

      setIsLoading(true);
      setError(null);

      try {
        const WaveSurfer = (await import('wavesurfer.js')).default;

        if (isDestroyed) return;

        waveSurferRef.current = WaveSurfer.create({
          container: waveformRef.current,
          waveColor,
          progressColor,
          height: 45,
          responsive: true,
          barWidth,
          cursorColor,
          cursorWidth,
          barHeight: 0.8,
          barGap: 2,
          normalize: true,
        });

        await waveSurferRef.current.load(audioSrc);

        if (isDestroyed) return;

        waveSurferRef.current.on('play', () => setIsPlaying(true));
        waveSurferRef.current.on('pause', () => setIsPlaying(false));
        waveSurferRef.current.on('finish', () => setIsPlaying(false));

        setIsLoading(false);
      } catch (error) {
        console.error('Error initializing WaveSurfer:', error);
        setError('Failed to load audio file');
        setIsLoading(false);
      }
    };

    initializeWaveSurfer();

    return () => {
      isDestroyed = true;
      if (waveSurferRef.current) {
        try {
          waveSurferRef.current.destroy();
          waveSurferRef.current = null;
        } catch (error) {
          console.error('Error destroying Wavesurfer instance:', error);
        }
      }
    };
  }, [isClient, audioSrc, waveColor, progressColor, height, barWidth, cursorColor, cursorWidth]);

  const handlePlayPause = () => {
    if (waveSurferRef.current && !isLoading && !error) {
      waveSurferRef.current.playPause();
    }
  };

  const handleStop = () => {
    if (waveSurferRef.current && !isLoading && !error) {
      waveSurferRef.current.stop();
      setIsPlaying(false);
    }
  };

  if (!isClient) {
    return (
      <div className="w-full">
        <div className="bg-transparent animate-pulse rounded-2xl border-2 border-blue-middle/30" style={{ height: `${height}px` }}>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div id="waveform" ref={waveformRef} className="mb-4 w-full bg-transparent rounded-2xl py-4 px-2 border-2 border-blue-middle/30 overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-middle/5 to-yellow-light/5"></div>
      </div>

      {error && (
        <div className="text-red-500 mt-2 text-sm text-center">
          {error}
        </div>
      )}

      <div className="flex gap-4 justify-center mb-4 w-full">
        <button
          onClick={handlePlayPause}
          className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-yellow-light text-blue-darkest hover:bg-white hover:text-blue-darkest transition-all duration-300 flex items-center justify-center disabled:bg-gray-400 disabled:cursor-not-allowed shadow-lg hover:scale-110"
          type="button"
          disabled={isLoading || error}
        >
          {isLoading ? (
            <i className="fas fa-spinner fa-spin text-lg" aria-label="Loading" />
          ) : isPlaying ? (
            <i className="fas fa-pause text-lg" aria-label="Pause" />
          ) : (
            <i className="fas fa-play text-lg ml-1" aria-label="Play" />
          )}
        </button>
        <button
          onClick={handleStop}
          className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-blue-darkest/30 backdrop-blur-sm text-white hover:bg-blue-darkest/50 transition-all duration-300 flex items-center justify-center disabled:bg-blue-darkest/20 disabled:cursor-not-allowed border-2 border-blue-middle/30 hover:border-blue-middle/50 hover:scale-110"
          type="button"
          disabled={isLoading || error}
        >
          <i className="fas fa-stop text-lg" aria-label="Stop" />
        </button>
      </div>
      <h6 className="text-center body-text text-text-light font-semibold">{title}</h6>
    </div>
  );
};

export default dynamic(() => Promise.resolve(WaveformPlayer), {
  ssr: false
});
