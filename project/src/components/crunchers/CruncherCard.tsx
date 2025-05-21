import React from 'react';
import { Link } from 'react-router-dom';
import { Play, Edit, Trash2, MessageSquare, History } from 'lucide-react';
import { format } from 'date-fns';
import { Cruncher } from '../../types';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../ui/Card';
import { Button } from '../ui/Button';

interface CruncherCardProps {
  cruncher: Cruncher;
  onDelete: (id: string) => void;
  onStartCrunch: (id: string) => void;
}

export const CruncherCard: React.FC<CruncherCardProps> = ({ 
  cruncher, 
  onDelete,
  onStartCrunch 
}) => {
  const { id, name, modelName, sitemapUrl, createdAt } = cruncher;

  return (
    <Card hoverable className="transition-all duration-300">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>{name}</span>
          <span className="text-sm font-normal bg-primary-dark text-white px-2 py-1 rounded-full">
            {modelName}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div>
            <p className="text-sm text-gray">Sitemap URL:</p>
            <p className="text-sm font-medium truncate" title={sitemapUrl}>
              {sitemapUrl}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray">Created:</p>
            <p className="text-sm">{format(new Date(createdAt), 'MMMM d, yyyy')}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-wrap gap-2 justify-between">
        <Button
          variant="primary"
          size="sm"
          icon={<Play className="w-4 h-4" />}
          onClick={() => onStartCrunch(id)}
        >
          Crunch
        </Button>
        
        <div className="flex gap-2">
          <Link to={`/crunchers/${id}/chat`}>
            <Button
              variant="secondary"
              size="sm"
              icon={<MessageSquare className="w-4 h-4" />}
            >
              Chat
            </Button>
          </Link>
          
          <Link to={`/crunchers/${id}/history`}>
            <Button
              variant="outline"
              size="sm"
              icon={<History className="w-4 h-4" />}
            >
              History
            </Button>
          </Link>
          
          <Link to={`/crunchers/${id}/edit`}>
            <Button
              variant="ghost"
              size="sm"
              icon={<Edit className="w-4 h-4" />}
            >
              Edit
            </Button>
          </Link>
          
          <Button
            variant="danger"
            size="sm"
            icon={<Trash2 className="w-4 h-4" />}
            onClick={() => onDelete(id)}
          >
            Delete
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};