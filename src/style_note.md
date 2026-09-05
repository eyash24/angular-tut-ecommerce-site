# Layout Styling Guide

**Layout & Sizing**

* `w-full` -> `width: 100%`
* `h-full` -> `height: 100%`
* `max-w-[1200px]` -> `max-width: 1200px`
* `min-w-[200px]` -> `min-width: 200px`
* `w-8` -> `width: 2rem`
* `h-8` -> `height: 2rem`
* `w-24` -> `width: 6rem`
* `h-24` -> `height: 6rem`
* `col-span-2` -> `grid-column: span 2 / span 2`

**Flexbox & Grid**

* `flex` -> `display: flex`
* `inline-flex` -> `display: inline-flex`
* `grid` -> `display: grid`
* `flex-col` -> `flex-direction: column`
* `items-center` -> `align-items: center`
* `items-start` -> `align-items: flex-start`
* `justify-between` -> `justify-content: space-between`
* `justify-center` -> `justify-content: center`
* `flex-1` -> `flex: 1 1 0%`
* `grid-cols-1` -> `grid-template-columns: repeat(1, minmax(0, 1fr))`
* `grid-cols-2` -> `grid-template-columns: repeat(2, minmax(0, 1fr))`
* `grid-cols-3` -> `grid-template-columns: repeat(3, minmax(0, 1fr))`

**Spacing & Gaps**

* `gap-1` -> `gap: 0.25rem`
* `gap-2` -> `gap: 0.5rem`
* `gap-3` -> `gap: 0.75rem`
* `gap-4` -> `gap: 1rem`
* `gap-6` -> `gap: 1.5rem`
* `gap-8` -> `gap: 2rem`
* `p-2` -> `padding: 0.5rem`
* `p-4` -> `padding: 1rem`
* `p-5` -> `padding: 1.25rem`
* `p-6` -> `padding: 1.5rem`
* `p-8` -> `padding: 2rem`
* `px-2` -> `padding-left: 0.5rem; padding-right: 0.5rem`
* `px-3` -> `padding-left: 0.75rem; padding-right: 0.75rem`
* `py-2` -> `padding-top: 0.5rem; padding-bottom: 0.5rem`
* `py-3` -> `padding-top: 0.75rem; padding-bottom: 0.75rem`
* `py-6` -> `padding-top: 1.5rem; padding-bottom: 1.5rem`
* `pb-4` -> `padding-bottom: 1rem`
* `pt-4` -> `padding-top: 1rem`
* `pt-6` -> `padding-top: 1.5rem`
* `mb-1` -> `margin-bottom: 0.25rem`
* `mb-2` -> `margin-bottom: 0.5rem`
* `mb-3` -> `margin-bottom: 0.75rem`
* `mb-4` -> `margin-bottom: 1rem`
* `mb-6` -> `margin-bottom: 1.5rem`
* `mb-8` -> `margin-bottom: 2rem`
* `mt-2` -> `margin-top: 0.5rem`
* `mt-6` -> `margin-top: 1.5rem`
* `mt-auto` -> `margin-top: auto`
* `mx-auto` -> `margin-left: auto; margin-right: auto`

**Typography & Colors**

* `text-xs` -> `font-size: 0.75rem; line-height: 1rem`
* `text-sm` -> `font-size: 0.875rem; line-height: 1.25rem`
* `text-base` -> `font-size: 1rem; line-height: 1.5rem`
* `text-lg` -> `font-size: 1.125rem; line-height: 1.75rem`
* `text-xl` -> `font-size: 1.25rem; line-height: 1.75rem`
* `text-2xl` -> `font-size: 1.5rem; line-height: 2rem`
* `text-3xl` -> `font-size: 1.875rem; line-height: 2.25rem`
* `font-medium` -> `font-weight: 500`
* `font-semibold` -> `font-weight: 600`
* `font-bold` -> `font-weight: 700`
* `font-extrabold` -> `font-weight: 800`
* `text-center` -> `text-align: center`
* `text-right` -> `text-align: right`
* `text-gray-500` -> `color: #6b7280`
* `text-gray-600` -> `color: #4b5563`
* `text-gray-900` -> `color: #111827`
* `bg-white` -> `background-color: #ffffff`
* `bg-gray-50` -> `background-color: #f9fafb`
* `bg-gray-100` -> `background-color: #f3f4f6`

**Borders, Effects & Positioning**

* `rounded-lg` -> `border-radius: 0.5rem`
* `rounded-xl` -> `border-radius: 0.75rem`
* `rounded-full` -> `border-radius: 9999px`
* `rounded-t-xl` -> `border-top-left-radius: 0.75rem; border-top-right-radius: 0.75rem`
* `border` -> `border-width: 1px`
* `border-t` -> `border-top-width: 1px`
* `border-0` -> `border-width: 0px`
* `shadow` -> `box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)`
* `shadow-md` -> `box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)`
* `shadow-lg` -> `box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)`
* `relative` -> `position: relative`
* `absolute` -> `position: absolute`
* `overflow-hidden` -> `overflow: hidden`
* `object-cover` -> `object-fit: cover`
* `cursor-pointer` -> `cursor: pointer`
* `z-10` -> `z-index: 10`

**Transitions & States**

* `transition-all` -> `transition-property: all`
* `duration-200` -> `transition-duration: 200ms`
* `ease-out` -> `transition-timing-function: ease-out`
* `hover:shadow-xl` -> `&:hover { box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1) }`
* `hover:-translate-y-1` -> `&:hover { transform: translateY(-0.25rem) }`
* `hover:scale-110` -> `&:hover { transform: scale(1.1) }`
