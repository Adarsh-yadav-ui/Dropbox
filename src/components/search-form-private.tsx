import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "./ui/command";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { SidebarGroup, SidebarGroupContent, SidebarInput } from "./ui/sidebar";
import { Label } from "./ui/label";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Id } from "../../convex/_generated/dataModel";
import { useRouter } from "next/navigation";
import Image from "next/image";

export function SearchForm() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const currentUser = useQuery(api.users.current);
  const allFiles = useQuery(
    api.files.getFilesForUser,
    currentUser?._id ? { userId: currentUser._id as Id<"users"> } : "skip"
  );

  // Debug: Log the data

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  // Function to get the appropriate icon for a file type
  const getFileIcon = (fileType: string) => {
    switch (fileType?.toLowerCase()) {
      case "image":
        return "/images.png";
      case "video":
        return "/videos.png";
      case "document":
      case "pdf":
        return "/documents.png";
      default:
        return "/others.png";
    }
  };

  // Filter files based on search query
  const filteredFiles = allFiles?.filter((file) => {
    if (!searchQuery.trim()) return false;

    const query = searchQuery.toLowerCase().trim();
    const nameMatch = file.name.toLowerCase().includes(query);
    const descriptionMatch = file.description?.toLowerCase().includes(query);

    return nameMatch || descriptionMatch;
  });

  const handleFileSelect = (fileId: string) => {
    router.push(`/dashboard/files/${fileId}`);
    setOpen(false);
  };

  return (
    <SidebarGroup className="py-0">
      <SidebarGroupContent className="relative">
        <Label htmlFor="search" className="sr-only">
          Search
        </Label>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <SidebarInput
              id="search"
              placeholder="Search files..."
              className="pl-8"
            />
          </DialogTrigger>
          <Search className="pointer-events-none absolute left-2 top-1/2 size-4 -translate-y-1/2 select-none opacity-50" />
          <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 select-none text-xs opacity-50">
            ⌘K
          </span>

          <DialogContent className="p-0">
            <DialogHeader className="sr-only">
              <DialogTitle>Search Command</DialogTitle>
            </DialogHeader>
            <Command shouldFilter={false}>
              <CommandInput
                placeholder="Type a command or search..."
                value={searchQuery}
                onValueChange={setSearchQuery}
              />
              <CommandList>
                <CommandEmpty>
                  {searchQuery.trim()
                    ? "No results found."
                    : "Start typing to search files..."}
                </CommandEmpty>

                {/* Files Section */}
                {filteredFiles && filteredFiles.length > 0 && (
                  <>
                    <CommandGroup heading="Files">
                      {filteredFiles.map((file) => (
                        <CommandItem
                          key={file._id}
                          onSelect={() => handleFileSelect(file._id)}
                        >
                          <Image
                            src={getFileIcon(file.fileType)}
                            alt={`${file.fileType} icon`}
                            height={50}
                            width={500}
                            className="mr-2 h-12 w-12"
                          />
                          <div className="flex flex-col">
                            <span>{file.name}</span>
                            {file.description && (
                              <span className="text-xs text-muted-foreground">
                                {file.description}
                              </span>
                            )}
                          </div>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                    <CommandSeparator />
                  </>
                )}
              </CommandList>
            </Command>
          </DialogContent>
        </Dialog>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
