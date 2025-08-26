'use client';

import { useState, useRef } from 'react';
import { setupDatabase, testDatabase } from '@/apps/habo-if/data/setup';
import { PostService } from '@/apps/habo-if/data/postService';

export default function TestPostsPage() {
  const [setupResult, setSetupResult] = useState<string>('');
  const [testResult, setTestResult] = useState<string>('');
  const [generatedImage, setGeneratedImage] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleSetup = async () => {
    const result = await setupDatabase();
    setSetupResult(result.message);
  };

  const handleTest = async () => {
    const result = await testDatabase();
    setTestResult(result.message);
  };

  const handleGenerateMatchday = async () => {
    if (!canvasRef.current) return;
    
    setIsGenerating(true);
    try {
      const result = await PostService.generateMatchdayPost(canvasRef.current);
      
      if (result.success) {
        setGeneratedImage(result.image_data!);
        setTestResult('✅ Matchday post generated successfully!');
      } else {
        setTestResult(`❌ Generation failed: ${result.error}`);
      }
    } catch (error) {
      setTestResult(`❌ Error: ${error}`);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleGenerateTraining = async () => {
    if (!canvasRef.current) return;
    
    setIsGenerating(true);
    try {
      const result = await PostService.generateTrainingPost(canvasRef.current);
      
      if (result.success) {
        setGeneratedImage(result.image_data!);
        setTestResult('✅ Training post generated successfully!');
      } else {
        setTestResult(`❌ Generation failed: ${result.error}`);
      }
    } catch (error) {
      setTestResult(`❌ Error: ${error}`);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleGeneratePlayerSpotlight = async () => {
    if (!canvasRef.current) return;
    
    setIsGenerating(true);
    try {
      const result = await PostService.generatePlayerSpotlightPost(canvasRef.current, 'player-1');
      
      if (result.success) {
        setGeneratedImage(result.image_data!);
        setTestResult('✅ Player spotlight generated successfully!');
      } else {
        setTestResult(`❌ Generation failed: ${result.error}`);
      }
    } catch (error) {
      setTestResult(`❌ Error: ${error}`);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Post System Test</h1>
        
        {/* Setup Section */}
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <h2 className="text-xl font-semibold mb-4">Database Setup</h2>
          <div className="space-y-4">
            <button
              onClick={handleSetup}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Check Database Setup
            </button>
            
            <button
              onClick={handleTest}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 ml-2"
            >
              Test Database Connection
            </button>
            
            {setupResult && (
              <div className="mt-4 p-4 bg-gray-100 rounded">
                <pre className="text-sm">{setupResult}</pre>
              </div>
            )}
            
            {testResult && (
              <div className="mt-4 p-4 bg-gray-100 rounded">
                <pre className="text-sm">{testResult}</pre>
              </div>
            )}
          </div>
        </div>

        {/* Generation Section */}
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <h2 className="text-xl font-semibold mb-4">Generate Posts</h2>
          <div className="space-y-4">
            <button
              onClick={handleGenerateMatchday}
              disabled={isGenerating}
              className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 disabled:bg-gray-400"
            >
              {isGenerating ? 'Generating...' : 'Generate Matchday Post'}
            </button>
            
            <button
              onClick={handleGenerateTraining}
              disabled={isGenerating}
              className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700 disabled:bg-gray-400 ml-2"
            >
              {isGenerating ? 'Generating...' : 'Generate Training Post'}
            </button>
            
            <button
              onClick={handleGeneratePlayerSpotlight}
              disabled={isGenerating}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 disabled:bg-gray-400 ml-2"
            >
              {isGenerating ? 'Generating...' : 'Generate Player Spotlight'}
            </button>
          </div>
        </div>

        {/* Generated Image */}
        {generatedImage && (
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Generated Image</h2>
            <img 
              src={generatedImage} 
              alt="Generated graphic" 
              className="max-w-md mx-auto border rounded shadow"
            />
            <div className="mt-4 text-center">
              <a
                href={generatedImage}
                download="habo-if-graphic.png"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Download Image
              </a>
            </div>
          </div>
        )}

        {/* Hidden canvas */}
        <canvas
          ref={canvasRef}
          style={{ display: 'none' }}
          width={1080}
          height={1080}
        />
      </div>
    </div>
  );
}