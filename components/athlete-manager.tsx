"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { UserPlus, Edit2, Trash2, Loader2, CheckCircle2 } from 'lucide-react'
import { addAthlete, updateAthlete, deleteAthlete } from "@/lib/actions/sports"

interface Athlete {
  id: string
  name: string
  number: string
  faculty: string
  checked_in: boolean
}

interface AthleteManagerProps {
  scheduleId: string
  athlete?: Athlete
  mode: "add" | "edit"
  trigger?: React.ReactNode
  onSuccess?: () => void
}

export function AthleteManager({ scheduleId, athlete, mode, trigger, onSuccess }: AthleteManagerProps) {
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: athlete?.name || "",
    number: athlete?.number || "",
    faculty: athlete?.faculty || "",
  })
  const [error, setError] = useState<string | null>(null)
  const [showSuccess, setShowSuccess] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      let result
      if (mode === "add") {
        result = await addAthlete(scheduleId, formData.name, formData.number, formData.faculty)
      } else {
        result = await updateAthlete(athlete!.id, formData.name, formData.number, formData.faculty)
      }

      if (result.success) {
        setSuccessMessage(`นักกีฬา ${formData.name} ถูก${mode === "add" ? "เพิ่ม" : "แก้ไข"}แล้ว`)
        setShowSuccess(true)
        setOpen(false)
        setFormData({ name: "", number: "", faculty: "" })
      } else {
        setError(result.error || "เกิดข้อผิดพลาด")
      }
    } catch (err) {
      setError("เกิดข้อผิดพลาดในการบันทึกข้อมูล")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          {trigger || (
            <Button variant={mode === "add" ? "default" : "outline"} size={mode === "add" ? "default" : "sm"}>
              {mode === "add" ? (
                <>
                  <UserPlus className="mr-2 h-4 w-4" />
                  เพิ่มนักกีฬา
                </>
              ) : (
                <>
                  <Edit2 className="mr-2 h-4 w-4" />
                  แก้ไข
                </>
              )}
            </Button>
          )}
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <form onSubmit={handleSubmit}>
            <DialogHeader>
              <DialogTitle>{mode === "add" ? "เพิ่มนักกีฬาใหม่" : "แก้ไขข้อมูลนักกีฬา"}</DialogTitle>
              <DialogDescription>{mode === "add" ? "กรอกข้อมูลนักกีฬาที่ต้องการเพิ่ม" : "แก้ไขข้อมูลนักกีฬา"}</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">ชื่อ-นามสกุล</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="กรอกชื่อ-นามสกุล"
                  required
                  disabled={isLoading}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="number">เบอร์</Label>
                <Input
                  id="number"
                  value={formData.number}
                  onChange={(e) => setFormData({ ...formData, number: e.target.value })}
                  placeholder="กรอกเบอร์"
                  required
                  disabled={isLoading}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="faculty">คณะ</Label>
                <Input
                  id="faculty"
                  value={formData.faculty}
                  onChange={(e) => setFormData({ ...formData, faculty: e.target.value })}
                  placeholder="กรอกชื่อคณะ"
                  required
                  disabled={isLoading}
                />
              </div>
              {error && <p className="text-sm text-destructive">{error}</p>}
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setOpen(false)} disabled={isLoading}>
                ยกเลิก
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {mode === "add" ? "เพิ่ม" : "บันทึก"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-500" />
              {mode === "add" ? "เพิ่มสำเหร็จ" : "บันทึกสำเหร็จ"}
            </DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm text-muted-foreground">{successMessage}</p>
          </div>
          <DialogFooter>
            <Button onClick={() => {
              setShowSuccess(false)
              onSuccess?.()
            }}>
              ปิด
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

interface DeleteAthleteDialogProps {
  athlete: Athlete
  trigger?: React.ReactNode
  onSuccess?: () => void
}

export function DeleteAthleteDialog({ athlete, trigger, onSuccess }: DeleteAthleteDialogProps) {
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const handleDelete = async () => {
    setIsLoading(true)

    try {
      const result = await deleteAthlete(athlete.id)

      if (result.success) {
        setShowSuccess(true)
        setOpen(false)
        const timer = setTimeout(() => {
          setShowSuccess(false)
          onSuccess?.()
        }, 3000)
        return () => clearTimeout(timer)
      }
    } catch (err) {
      console.error("Error deleting athlete:", err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogTrigger asChild>
          {trigger || (
            <Button variant="destructive" size="sm">
              <Trash2 className="mr-2 h-4 w-4" />
              ลบ
            </Button>
          )}
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>ยืนยันการลบนักกีฬา</AlertDialogTitle>
            <AlertDialogDescription>
              คุณต้องการลบ <span className="font-semibold">{athlete.name}</span> ใช่หรือไม่? การดำเนินการนี้ไม่สามารถย้อนกลับได้
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isLoading}>ยกเลิก</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isLoading}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              ลบ
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-500" />
              ลบสำเหร็จ
            </DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm text-muted-foreground">นักกีฬา {athlete.name} ถูกลบออกแล้ว</p>
          </div>
          <DialogFooter>
            <Button onClick={() => {
              setShowSuccess(false)
              onSuccess?.()
            }}>
              ปิด
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
