'use client';

import React, { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { v4 as uuidv4 } from 'uuid';
import * as Y from 'yjs';
import { WebrtcProvider } from 'y-webrtc';

// Dynamically import Froala to avoid SSR issues
const FroalaEditor = dynamic(
  async () => {
    const values = await Promise.all([
      import('react-froala-wysiwyg')
    ]);
    return values[0].default;
  },
  { ssr: false }
);

// Froala license key - you should replace this with your own
const LICENSE_KEY = '';

interface EditorProps {
  username: string;
  userColor: string;
  sessionId: string;
}

const Editor: React.FC<EditorProps> = ({ username, userColor, sessionId }) => {
  const [content, setContent] = useState('');
  const [activeUsers, setActiveUsers] = useState<{id: string, name: string, color: string}[]>([]);
  const [editorLoaded, setEditorLoaded] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState('');
  
  const ydocRef = useRef<Y.Doc | null>(null);
  const providerRef = useRef<WebrtcProvider | null>(null);
  const userIdRef = useRef<string>(uuidv4());
  
  useEffect(() => {
    // Set editor as loaded
    setEditorLoaded(true);

    // Initialize the YJS document
    const ydoc = new Y.Doc();
    ydocRef.current = ydoc;
    
    // Create shared text
    const ytext = ydoc.getText('froala');
    
    // Set up WebRTC provider for real-time collaboration
    const provider = new WebrtcProvider(`froala-session-${sessionId}`, ydoc, {
      signaling: ['wss://signaling.yjs.dev'],
    });
    providerRef.current = provider;
    
    // Set awareness (user presence)
    const awareness = provider.awareness;
    awareness.setLocalStateField('user', {
      id: userIdRef.current,
      name: username,
      color: userColor
    });
    
    // Handle awareness updates (users joining/leaving)
    awareness.on('change', () => {
      const users: {id: string, name: string, color: string}[] = [];
      awareness.getStates().forEach((state: any) => {
        if (state.user) {
          users.push({
            id: state.user.id,
            name: state.user.name,
            color: state.user.color
          });
        }
      });
      setActiveUsers(users);
    });
    
    // Initialize content from shared doc
    const initialContent = ytext.toString();
    if (initialContent) {
      setContent(initialContent);
    }
    
    // Observe changes to update editor
    ytext.observe((event: Y.YTextEvent) => {
      setContent(ytext.toString());
    });
    
    return () => {
      provider.disconnect();
      ydoc.destroy();
    };
  }, [sessionId, username, userColor]);
  
  const handleModelChange = (model: string) => {
    if (ydocRef.current) {
      const ytext = ydocRef.current.getText('froala');
      
      // We need to prevent infinite loops of updates
      // This is a simplified approach - more robust solutions would track origins
      const currentContent = ytext.toString();
      if (model !== currentContent) {
        ytext.delete(0, ytext.length);
        ytext.insert(0, model);
      }
    }
  };
  
  const handleSave = () => {
    setIsSaving(true);
    const blob = new Blob([content], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `collaborative-document-${sessionId}.html`;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      setIsSaving(false);
      setSaveMsg('Document downloaded!');
      setTimeout(() => setSaveMsg(''), 2000);
    }, 500);
  };
  
  const froalaConfig = {
    key: LICENSE_KEY,
    placeholderText: 'Start typing here...',
    events: {
      'initialized': function() {
        console.log('Froala Editor initialized');
      }
    },
    toolbarButtons: {
      moreText: {
        buttons: ['bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript', 'fontFamily', 'fontSize', 'textColor', 'backgroundColor', 'clearFormatting'],
      },
      moreParagraph: {
        buttons: ['alignLeft', 'alignCenter', 'alignRight', 'alignJustify', 'formatOL', 'formatUL', 'paragraphFormat', 'lineHeight', 'outdent', 'indent', 'quote'],
      },
      moreRich: {
        buttons: ['insertLink', 'insertTable', 'emoticons', 'specialCharacters', 'insertHR'],
      },
      moreMisc: {
        buttons: ['undo', 'redo', 'fullscreen', 'selectAll', 'help'],
        align: 'right',
        buttonsVisible: 2,
      },
    },
    attribution: false,  // Remove Froala branding
  };

  if (!editorLoaded) {
    return (
      <div className="editor-container">
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="editor-container">
      <div className="active-users-container mb-4 flex flex-wrap gap-2 items-center">
        <h2 className="text-lg font-semibold mb-2 text-gray-700">Active Users ({activeUsers.length})</h2>
        <div className="flex flex-wrap gap-2">
          {activeUsers.map((user) => (
            <div
              key={user.id}
              className="px-3 py-1 rounded-full text-white text-sm flex items-center shadow"
              style={{ backgroundColor: user.color, opacity: user.id === userIdRef.current ? 1 : 0.85 }}
            >
              <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
              {user.name}
              {user.id === userIdRef.current && ' (You)'}
            </div>
          ))}
        </div>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className={`ml-auto px-5 py-2 rounded-lg font-semibold text-white shadow transition-all duration-200 ${isSaving ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
        >
          {isSaving ? 'Saving...' : 'Save & Download'}
        </button>
        {saveMsg && <span className="ml-4 text-green-600 font-medium animate-fade-in">{saveMsg}</span>}
      </div>
      
      <div className="editor-wrapper border rounded-lg overflow-hidden shadow-lg">
        {editorLoaded && (
          <FroalaEditor
            model={content}
            onModelChange={handleModelChange}
            config={froalaConfig}
            tag="div"
          />
        )}
      </div>
    </div>
  );
};

export default Editor; 