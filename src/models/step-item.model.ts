export interface StepItem {
  step: number;
  title: string;
}

export const ReviewerStepItems: Array<StepItem> = [
  {
    step: 1,
    title: 'ข้อมูลส่วนตัว'
  },
  {
    step: 2,
    title: 'ยืนยันข้อมูล'
  },
]

export const ReataurantStepItems: Array<StepItem> = [
  {
    step: 1,
    title: 'ข้อมูลส่วนตัว'
  },
  {
    step: 2,
    title: 'ข้อมูลร้านค้า'
  },
  {
    step: 3,
    title: 'อัพโหลดรูปภาพร้านค้า'
  },
  {
    step: 4,
    title: 'ยืนยันข้อมูล'
  },
]

export const EditReataurantStepItems: Array<StepItem> = [
  {
    step: 1,
    title: 'ข้อมูลร้านค้า'
  },
  {
    step: 2,
    title: 'อัพโหลดรูปภาพร้านค้า'
  },
  {
    step: 3,
    title: 'ยืนยันข้อมูล'
  },
]
