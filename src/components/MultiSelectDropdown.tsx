import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface Option {
  value: string
  label: string
}

interface MultiSelectDropdownProps {
  options: Option[]
  placeholder?: string
  className?: string
  onSelectionChange?: (selectedValues: string[]) => void
  defaultValues?: string[]
}

export const MultiSelectDropdown = ({ 
  options, 
  placeholder = "Selecionar", 
  className,
  onSelectionChange,
  defaultValues = []
}: MultiSelectDropdownProps) => {
  const [selectedValues, setSelectedValues] = useState<string[]>(defaultValues)
  const [isOpen, setIsOpen] = useState(false)

  const handleCheckboxChange = (value: string, checked: boolean) => {
    let newSelectedValues: string[]
    
    if (checked) {
      newSelectedValues = [...selectedValues, value]
    } else {
      newSelectedValues = selectedValues.filter(v => v !== value)
    }
    
    setSelectedValues(newSelectedValues)
    onSelectionChange?.(newSelectedValues)
  }

  const getDisplayText = () => {
    if (selectedValues.length === 0) {
      return placeholder
    } else if (selectedValues.length === 1) {
      const selectedOption = options.find(opt => opt.value === selectedValues[0])
      return selectedOption?.label || placeholder
    } else {
      return `${selectedValues.length} selecionadas`
    }
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={isOpen}
          className={cn(
            "w-full justify-between text-left font-normal",
            selectedValues.length === 0 && "text-muted-foreground",
            className
          )}
        >
          {getDisplayText()}
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        className="w-full min-w-[200px] max-h-[300px] overflow-y-auto bg-popover border border-border shadow-md z-50"
        align="start"
      >
        <div className="p-2 space-y-2">
          {options.map((option) => (
            <div
              key={option.value}
              className="flex items-center space-x-2 p-2 hover:bg-accent hover:text-accent-foreground rounded-sm cursor-pointer"
              onClick={() => {
                const isChecked = selectedValues.includes(option.value)
                handleCheckboxChange(option.value, !isChecked)
              }}
            >
              <Checkbox
                checked={selectedValues.includes(option.value)}
                onCheckedChange={(checked) => {
                  handleCheckboxChange(option.value, !!checked)
                }}
                className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
              />
              <label className="text-sm font-medium leading-none cursor-pointer flex-1">
                {option.label}
              </label>
            </div>
          ))}
          {options.length === 0 && (
            <div className="p-2 text-sm text-muted-foreground text-center">
              Nenhuma opção disponível
            </div>
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}