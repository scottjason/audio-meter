import './App.css';
import video from './19518-trimmed.mov';
import { useEffect } from 'react';
import webAudioPeakMeter from 'web-audio-peak-meter';

function App() {
  useEffect(() => {
    const bindAudioToMeter = async () => {
      const meterElement = document.getElementById('peak-meter');
      const video = document.getElementById('video');
      var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const sourceNode = audioCtx.createMediaElementSource(video);
      sourceNode.connect(audioCtx.destination);
      const meterNode = webAudioPeakMeter.createMeterNode(sourceNode, audioCtx);
      webAudioPeakMeter.createMeter(meterElement, meterNode, {});
      video.addEventListener('play', function () {
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
