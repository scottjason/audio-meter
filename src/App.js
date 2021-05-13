import './App.css';
import video from './19518-trimmed.mov';
import { useEffect } from 'react';
import webAudioPeakMeter from 'web-audio-peak-meter';

function App() {
  useEffect(() => {
    const bindAudioToMeter = async () => {
      const audioStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: false,
      });
      const meterElement = document.getElementById('peak-meter');
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const sourceNode = audioCtx.createMediaStreamSource(audioStream);
      const meterNode = webAudioPeakMeter.createMeterNode(sourceNode, audioCtx);
      webAudioPeakMeter.createMeter(meterElement, meterNode, {});
    };
    bindAudioToMeter();
  }, []);

  return (
    <div className='container'>
      <div id='peak-meter'></div>
      <video id='video' controls>
        <source src={video} type='video/mp4' />
      </video>
    </div>
  );
}

export default App;
