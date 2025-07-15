import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Search, Calendar } from 'lucide-react';
import { Input } from './ui/input';
import { Slider } from './ui/slider';
import { Button } from './ui/button';
import type { RootState } from '../store';
import { setTimeRange, setSearchQuery } from '../store/slices/layersSlice';

const TopBar: React.FC = () => {
  const dispatch = useDispatch();
  const { timeRange, searchQuery } = useSelector((state: RootState) => state.layers);

  const handleTimeRangeChange = (value: number[]) => {
    dispatch(setTimeRange(value[0]));
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(e.target.value));
  };

  return (
    <div className="sticky top-0 z-50 w-full p-4">
      <div className="mx-auto max-w-7xl">
        <div className="bg-background/70 backdrop-blur-md border border-border/50 rounded-xl shadow-lg p-4">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search Bar */}
            <div className="flex items-center gap-3 flex-1 max-w-md">
              <Search className="h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search tehsils..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="bg-background/50 border-border/50 backdrop-blur-sm"
              />
            </div>

            {/* Time Slider */}
            <div className="flex items-center gap-4 flex-1 max-w-md">
              <Calendar className="h-5 w-5 text-muted-foreground" />
              <div className="flex-1">
                <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
                  <span>Year: {timeRange.current}</span>
                  <span className="text-xs">{timeRange.start} - {timeRange.end}</span>
                </div>
                <Slider
                  value={[timeRange.current]}
                  min={timeRange.start}
                  max={timeRange.end}
                  step={1}
                  onValueChange={handleTimeRangeChange}
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;