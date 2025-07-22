import React, { useRef, useState } from 'react';
import { Upload, File, X, Eye, EyeOff } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { useToast } from './ui/use-toast';

interface UploadedLayer {
  id: string;
  name: string;
  file: File;
  geojson: any;
  color: string;
  visible: boolean;
}

interface GeoJSONUploadProps {
  onLayerAdd: (layer: UploadedLayer) => void;
  onLayerToggle: (id: string) => void;
  onLayerRemove: (id: string) => void;
  uploadedLayers: UploadedLayer[];
}

const generateRandomColor = () => {
  const colors = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FECA57',
    '#FF9FF3', '#54A0FF', '#5F27CD', '#00D2D3', '#FF9F43'
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

const GeoJSONUpload: React.FC<GeoJSONUploadProps> = ({
  onLayerAdd,
  onLayerToggle,
  onLayerRemove,
  uploadedLayers
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);
  const { toast } = useToast();

  const handleFileSelect = (files: FileList | null) => {
    if (!files) return;

    Array.from(files).forEach(file => {
      if (file.type === 'application/geo+json' || file.name.endsWith('.geojson')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const geojson = JSON.parse(e.target?.result as string);
            const layer: UploadedLayer = {
              id: `upload_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
              name: file.name.replace('.geojson', ''),
              file,
              geojson,
              color: generateRandomColor(),
              visible: true
            };
            onLayerAdd(layer);
            toast({
              title: "Layer uploaded successfully",
              description: `${layer.name} has been added to the map.`,
            });
          } catch (error) {
            toast({
              title: "Upload failed",
              description: "Invalid GeoJSON file format.",
              variant: "destructive",
            });
          }
        };
        reader.readAsText(file);
      } else {
        toast({
          title: "Invalid file type",
          description: "Please upload a .geojson file.",
          variant: "destructive",
        });
      }
    });
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    handleFileSelect(e.dataTransfer.files);
  };

  const handleLayerRename = (id: string, newName: string) => {
    // This would be handled by the parent component
    // For now, we'll just show a toast
    toast({
      title: "Rename layer",
      description: "Layer renaming will be implemented in the next update.",
    });
  };

  return (
    <Card className="glass">
      <CardContent className="p-4">
        <div className="space-y-4">
          {/* Upload Area */}
          <div
            className={`border-2 border-dashed rounded-lg p-4 text-center transition-colors ${
              dragOver 
                ? 'border-primary bg-primary/10' 
                : 'border-border hover:border-primary/50'
            }`}
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
            <p className="text-sm font-medium mb-1">Upload GeoJSON</p>
            <p className="text-xs text-muted-foreground">
              Drag & drop or click to select .geojson files
            </p>
            <input
              ref={fileInputRef}
              type="file"
              accept=".geojson,application/geo+json"
              multiple
              className="hidden"
              onChange={(e) => handleFileSelect(e.target.files)}
            />
          </div>

          {/* Uploaded Layers List */}
          {uploadedLayers.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Uploaded Layers</h4>
              {uploadedLayers.map((layer) => (
                <div
                  key={layer.id}
                  className="flex items-center gap-2 p-2 rounded-lg bg-background/30 hover:bg-background/50 transition-colors"
                >
                  <div
                    className="w-3 h-3 rounded-full border"
                    style={{ backgroundColor: layer.color }}
                  />
                  <Input
                    value={layer.name}
                    onChange={(e) => handleLayerRename(layer.id, e.target.value)}
                    className="flex-1 h-6 text-xs border-0 bg-transparent focus:bg-background/50"
                  />
                  <Badge variant="secondary" className="text-xs">
                    {layer.geojson.features?.length || 0} features
                  </Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0"
                    onClick={() => onLayerToggle(layer.id)}
                  >
                    {layer.visible ? 
                      <Eye className="h-3 w-3" /> : 
                      <EyeOff className="h-3 w-3" />
                    }
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0 text-destructive hover:text-destructive"
                    onClick={() => onLayerRemove(layer.id)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default GeoJSONUpload;