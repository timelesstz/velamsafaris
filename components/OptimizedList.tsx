import React, { memo } from 'react'

const ListItem = memo(({ item }: { item: string }) => (
  <li>{item}</li>
))

export default function OptimizedList({ items }: { items: string[] }) {
  return (
    <ul>
      {items.map((item, index) => (
        <ListItem key={index} item={item} />
      ))}
    </ul>
  )
}