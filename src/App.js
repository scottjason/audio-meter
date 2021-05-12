import './App.css';
import video from './19518-trimmed.mov';
import { useEffect } from 'react';
import webAudioPeakMeter from 'web-audio-peak-meter';

function App() {
  useEffect(() => {
    const bindAudioToMeter = async () => {
      const meterElement = document.getElementById('peak-meter');
      const myAudio = document.getElementById('video');
      const audioCtx = new window.AudioContext();
      const sourceNode = audioCtx.createMediaElementSource(myAudio);
      const meterNode = webAudioPeakMeter.createMeterNode(sourceNode, audioCtx);
      webAudioPeakMeter.createMeter(meterElement, meterNode, {});
      myAudio.addEventListener('play', function () {
        audioCtx.resume();
      });
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
