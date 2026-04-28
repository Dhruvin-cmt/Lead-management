import {
  categoryDetails,
  fetchTech,
  newTech,
  removeTech,
} from "@/apis/tech-api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardHeader,
  CardDescription,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableBody,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { PlusIcon } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import type { TechData } from "@/types/types";
import { useSearchParams } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function TechPage() {
  const [tech, setTech] = useState([]);
  const [addToggle, setAddToggle] = useState<boolean>(false);
  const [techName, setTechName] = useState<string>("");
  const [techCategory, setTechCategory] = useState<string>();
  const [categoryEnum, setCategoryEnum] = useState<string[]>();
  const [maxPage, setMaxPage] = useState<number>();
  const [searchParams, setSearchParams] = useSearchParams();

  const page = Number(searchParams.get("page")) || 1;

  const techDetails = useCallback(async () => {
    const ans = (await fetchTech(page)).data.data;
    const mPage = Math.ceil(ans.totalData / ans.limit);
    setMaxPage(mPage);
    return ans.paginateDate;
  }, [page]);

  const addNewTech = async (techData: TechData) => {
    try {
      await newTech(techData);
      const updatedData = await techDetails();
      setAddToggle(false);
      setTech(updatedData);
    } catch (error) {
      console.log(error);
      throw new Error();
    }
  };

  const deleteTech = async (id: string) => {
    try {
      await removeTech(id);
      const updatedData = await techDetails();
      setTech(updatedData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const d = async () => {
      try {
        const data = await techDetails();
        setTech(data);
      } catch (error) {
        console.log(error);
      }
    };
    d();
  }, [techDetails]);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const data = (await categoryDetails()).data.data;
        console.log(data);
        setCategoryEnum(data);
      } catch (error) {
        console.log(error);
      }
    };
    getCategories();
  }, []);

  return (
    <div className="p-6 space-y-6">
      {/* ✅ HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Tech Stack Details</h1>
          <p className="text-muted-foreground text-sm">
            Here's your tech stack details in which we are master
          </p>
        </div>

        <Button onClick={() => setAddToggle(true)} className="gap-2">
          <PlusIcon size={16} />
          Add Tech
        </Button>
      </div>

      {/* ✅ TABLE CARD */}
      <Card>
        <CardHeader>
          <CardTitle>Tech List</CardTitle>
          <CardDescription>Manage your technologies here</CardDescription>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tech Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {tech.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={3}
                    className="text-center py-6 text-muted-foreground"
                  >
                    No tech added yet 🚀
                  </TableCell>
                </TableRow>
              ) : (
                tech.map((techObj) => (
                  <TableRow key={techObj.id}>
                    <TableCell className="font-medium">
                      {techObj.name}
                    </TableCell>

                    <TableCell>
                      <span className="px-2 py-1 rounded-md text-xs bg-muted">
                        {techObj.category}
                      </span>
                    </TableCell>

                    <TableCell className="text-right">
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => deleteTech(techObj.id)}
                      >
                        Remove
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  className="cursor-pointer"
                  onClick={() => {
                    const current = Number(searchParams.get("page")) || 1;
                    const params = new URLSearchParams(searchParams);
                    params.set("page", String(Math.max(current - 1, 1)));
                    setSearchParams(params);
                  }}
                />
              </PaginationItem>
              {/* PAGE NUMBERS */}
              {Array.from({ length: maxPage }).map((_, i) => (
                <PaginationItem key={i}>
                  <PaginationLink
                    className="cursor-pointer"
                    isActive={page === i + 1}
                    onClick={() => {
                      const params = new URLSearchParams(searchParams);
                      params.set("page", String(i + 1));
                      setSearchParams(params);
                    }}
                  >
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}

              <PaginationItem>
                <PaginationNext
                  onClick={() => {
                    const current = Number(searchParams.get("page")) || 1;
                    const params = new URLSearchParams(searchParams);
                    params.set("page", String(Math.min(current + 1, maxPage)));
                    setSearchParams(params);
                  }}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </CardFooter>
      </Card>

      {/* ✅ MODAL OVERLAY */}
      {addToggle && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <Card className="w-100 shadow-lg">
            <CardHeader>
              <CardTitle>Add New Tech</CardTitle>
              <CardDescription>
                Add a new technology to your stack
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form className="space-y-4">
                <div>
                  <Label>Tech Name</Label>
                  <Input
                    value={techName}
                    onChange={(e) => setTechName(e.target.value)}
                    placeholder="ReactJS, NodeJS..."
                  />
                </div>

                <div>
                  <Select
                    onValueChange={(value) => {
                      if (typeof value === "string") {
                        setTechCategory(value);
                      }
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select tech category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {categoryEnum.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </form>
            </CardContent>

            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setAddToggle(false)}>
                Cancel
              </Button>

              <Button
                onClick={() =>
                  addNewTech({ name: techName, category: techCategory })
                }
              >
                Add Tech
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  );
}
