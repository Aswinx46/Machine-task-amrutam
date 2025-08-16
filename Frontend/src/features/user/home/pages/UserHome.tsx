import { useState } from "react"
import { Search, Filter, SlidersHorizontal } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { useFindSlots } from "../hooks/userHomeHooks"
import Pagination from "@/components/Pagination"
import SlotCard from "@/components/slots/SlotCard"
import type { IavailabilityTime } from "@/types/appointment/appointment"

interface FilterState {
  online: boolean
  inperson: boolean
  minPrice: number
  maxPrice: number
  duration: string
}

interface SortOption {
  value: string
  label: string
}

const sortOptions: SortOption[] = [
  { value: "relevance", label: "Most Relevant" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "duration", label: "Duration" },
  { value: "newest", label: "Newest First" },
  { value: "rating", label: "Highest Rated" },
]

const durationOptions = [
  { value: "any", label: "Any Duration" },
  { value: "30", label: "30 minutes" },
  { value: "60", label: "60 minutes" },
  { value: "120", label: "2 hours" },
  // { value: "120+", label: "2+ hours" },
]

export function UserHomePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("relevance")
  const [page, setPage] = useState<number>(1)
  const [mode, setMode] = useState<string | null>(null)
  const [duration, setDuration] = useState<number | null>(null)
  const limit = import.meta.env.VITE_PAGE_LIMIT
  const [filters, setFilters] = useState<FilterState>({
    online: false,
    inperson: false,
    minPrice: 0,
    maxPrice: 1000,
    duration: "any",
  })
  const slotData = useFindSlots(page, limit, searchQuery, mode || '', filters.minPrice || '', filters.maxPrice || '', duration || '')


  const handleBookSlot = (slot: IavailabilityTime, slotId: string, timingIndex: number) => {

  }

  const handleFilterChange = (key: keyof FilterState, value: string | number | boolean) => {
    console.log('this is the value', value)
    if (key === 'online') {
      setMode('online')
      setFilters((prev) => ({ ...prev, online: !prev.online }))
    } else if (key === 'inperson') {
      setMode('inperson')
      setFilters((prev) => ({ ...prev, inperson: !prev.inperson }))
    } else if (key === 'duration') {
      setDuration(Number(value))
    }

  }

  const handlePriceRangeChange = (values: number[]) => {
    setFilters((prev) => ({
      ...prev,
      minPrice: values[0],
      maxPrice: values[1],
    }))
  }

  const clearFilters = () => {
    setFilters({
      online: false,
      inperson: false,
      minPrice: 0,
      maxPrice: 1000,
      duration: "any",
    })
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header with Search Bar */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="text"
              placeholder="Search for services, courses, or events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-3 text-lg"
            />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Left Sidebar - Filters and Sorting */}
          <div className="w-80 flex-shrink-0">
            <div className="space-y-6">
              {/* Sorting Section */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <SlidersHorizontal className="h-5 w-5" />
                    Sort By
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select sorting option" />
                    </SelectTrigger>
                    <SelectContent>
                      {sortOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </CardContent>
              </Card>

              {/* Filters Section */}
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Filter className="h-5 w-5" />
                      Filters
                    </CardTitle>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearFilters}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      Clear All
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Format Type */}
                  <div className="space-y-3">
                    <Label className="text-sm font-medium">Format</Label>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="online"
                          checked={filters.online}
                          onCheckedChange={(checked) => handleFilterChange("online", checked)}
                        />
                        <Label htmlFor="online" className="text-sm">
                          Online
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="inperson"
                          checked={filters.inperson}
                          onCheckedChange={(checked) => handleFilterChange("inperson", checked)}
                          className="border-2 border-black"
                        />
                        <Label htmlFor="inperson" className="text-sm">
                          In-Person
                        </Label>
                      </div>
                    </div>
                  </div>

                  {/* Price Range */}
                  <div className="space-y-3">
                    <Label className="text-sm font-medium">Price Range</Label>
                    <div className="px-2">
                      <Slider
                        value={[filters.minPrice, filters.maxPrice]}
                        onValueChange={handlePriceRangeChange}
                        max={1000}
                        min={0}
                        step={10}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground mt-2">
                        <span>${filters.minPrice}</span>
                        <span>${filters.maxPrice}</span>
                      </div>
                    </div>
                  </div>

                  {/* Duration */}
                  <div className="space-y-3">
                    <Label className="text-sm font-medium">Duration</Label>
                    <Select value={filters.duration} onValueChange={(value) => handleFilterChange("duration", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select duration" />
                      </SelectTrigger>
                      <SelectContent>
                        {durationOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* Active Filters Summary */}
              {(filters.online ||
                filters.inperson ||
                filters.duration !== "any" ||
                filters.minPrice > 0 ||
                filters.maxPrice < 1000) && (
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm">Active Filters</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {filters.online && (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-primary text-primary-foreground">
                            Online
                          </span>
                        )}
                        {filters.inperson && (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-primary text-primary-foreground">
                            In-Person
                          </span>
                        )}
                        {filters.duration !== "any" && (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-primary text-primary-foreground">
                            {durationOptions.find((d) => d.value === filters.duration)?.label}
                          </span>
                        )}
                        {(filters.minPrice > 0 || filters.maxPrice < 1000) && (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-primary text-primary-foreground">
                            ${filters.minPrice} - ${filters.maxPrice}
                          </span>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )}
            </div>
          </div>

          {/* Main Content Area - Left Empty for Future Content */}
          {slotData.data && <SlotCard handleBookSlot={handleBookSlot} isDoctor={false} role="user" slots={slotData.data.slots} />}
        </div>
      </div>
      {slotData.data && slotData.data.slots.length > 0 && < Pagination current={page} setPage={setPage} total={slotData.data.totalPages} />}
    </div>
  )
}
