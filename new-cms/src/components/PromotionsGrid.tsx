"use client";

import { useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import Image from "next/image";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface Promotion {
  id: string;
  image: string;
  title: string;
  currentPrice: string;
  originalPrice: string;
  active: boolean;
}

// 拖拽图标组件（3x3网格）
function DragHandle() {
  return (
    <div className="flex flex-col gap-1 cursor-grab active:cursor-grabbing">
      <div className="flex gap-1">
        <div className="w-1.5 h-1.5 bg-gray-400"></div>
        <div className="w-1.5 h-1.5 bg-gray-400"></div>
        <div className="w-1.5 h-1.5 bg-gray-400"></div>
      </div>
      <div className="flex gap-1">
        <div className="w-1.5 h-1.5 bg-gray-400"></div>
        <div className="w-1.5 h-1.5 bg-gray-400"></div>
        <div className="w-1.5 h-1.5 bg-gray-400"></div>
      </div>
      <div className="flex gap-1">
        <div className="w-1.5 h-1.5 bg-gray-400"></div>
        <div className="w-1.5 h-1.5 bg-gray-400"></div>
        <div className="w-1.5 h-1.5 bg-gray-400"></div>
      </div>
    </div>
  );
}

// 可排序的行组件
function SortablePromotionRow({
  promotion,
  onToggleActive,
  onEdit,
  onDelete,
}: {
  promotion: Promotion;
  onToggleActive: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: promotion.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <tr
      ref={setNodeRef}
      style={style}
      className="border-b border-gray-200 hover:bg-gray-50"
    >
      {/* Display Order / Drag Handle */}
      <td className="px-4 py-4">
        <div className="flex flex-col items-center gap-2">
          {/* <span className="text-xs text-gray-400 uppercase tracking-wide">display order</span> */}
          <div {...attributes} {...listeners} className="hover:opacity-70 transition-opacity">
            <DragHandle />
          </div>
        </div>
      </td>

      {/* Image */}
      <td className="px-4 py-4">
        <div className="w-16 h-16 relative rounded overflow-hidden bg-gray-100">
          <Image
            src={promotion.image}
            alt={promotion.title}
            fill
            className="object-cover"
            sizes="64px"
          />
        </div>
      </td>

      {/* Title */}
      <td className="px-4 py-4">
        <span className="text-gray-800 font-medium">{promotion.title}</span>
      </td>

      {/* Price */}
      <td className="px-4 py-4">
        <div className="flex flex-col">
          <span className="text-green-600 font-semibold">
            {promotion.currentPrice}
          </span>
          <span className="text-gray-400 text-sm line-through">
            {promotion.originalPrice}
          </span>
        </div>
      </td>

      {/* Active Toggle */}
      <td className="px-4 py-4">
        <button
          onClick={() => onToggleActive(promotion.id)}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
            promotion.active ? "bg-green-500" : "bg-gray-300"
          }`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              promotion.active ? "translate-x-6" : "translate-x-1"
            }`}
          />
        </button>
      </td>

      {/* Actions */}
      <td className="px-4 py-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => onEdit(promotion.id)}
            className="text-gray-600 hover:text-gray-900 transition-colors"
            aria-label="Edit"
          >
            <Pencil className="w-5 h-5" />
          </button>
          <button
            onClick={() => onDelete(promotion.id)}
            className="text-gray-600 hover:text-red-600 transition-colors"
            aria-label="Delete"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </td>
    </tr>
  );
}

export function PromotionsGrid() {
  // 示例数据
  const [promotions, setPromotions] = useState<Promotion[]>([
    {
      id: "1",
      image: "/placeholder-image.jpg",
      title: "January Promo Foot Massage DUO",
      currentPrice: "$125",
      originalPrice: "$158",
      active: true,
    },
    {
      id: "2",
      image: "/placeholder-image.jpg",
      title: "January Promo Holographic Head Spa DUO",
      currentPrice: "$129",
      originalPrice: "$156",
      active: true,
    },
  ]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setPromotions((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const handleToggleActive = (id: string) => {
    setPromotions((items) =>
      items.map((item) =>
        item.id === id ? { ...item, active: !item.active } : item
      )
    );
  };

  const handleEdit = (id: string) => {
    // TODO: 实现编辑功能
    console.log("Edit promotion:", id);
  };

  const handleDelete = (id: string) => {
    if (confirm("确定要删除这个促销活动吗？")) {
      setPromotions((items) => items.filter((item) => item.id !== id));
    }
  };

  const handleAddPromotion = () => {
    // TODO: 实现添加功能
    console.log("Add new promotion");
  };

  return (
    <div className="flex-1 p-8 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Promotions Grid
          </h1>
          <p className="text-gray-600">
            Manage the 3-column promotion cards on the homepage.
          </p>
        </div>
        <button
          onClick={handleAddPromotion}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>Add Promotion</span>
        </button>
      </div>

      {/* Promotions Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider w-32">
                  Display Order
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Image
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Active
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              <SortableContext
                items={promotions.map((p) => p.id)}
                strategy={verticalListSortingStrategy}
              >
                {promotions.map((promotion) => (
                  <SortablePromotionRow
                    key={promotion.id}
                    promotion={promotion}
                    onToggleActive={handleToggleActive}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                ))}
              </SortableContext>
            </tbody>
          </table>
        </DndContext>
      </div>
    </div>
  );
}

