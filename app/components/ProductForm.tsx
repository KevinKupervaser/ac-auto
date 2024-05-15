"use client";
import {
  Button,
  Input,
  Option,
  Select,
  Textarea,
} from "@material-tailwind/react";
import React, {
  useEffect,
  useState,
  useTransition,
  ChangeEventHandler,
} from "react";
import { PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import categories from "@/app/utils/categories";
import ImageSelector from "@/app/components/ImageSelector";
import { NewProductInfo } from "../types";
import fuel_types from "../utils/fuels";
import transmition_types from "../utils/transmitions";

interface Props {
  initialValue?: InitialValue;
  onSubmit(values: NewProductInfo): void;
  onImageRemove?(source: string): void;
  rest: any;
}

export interface InitialValue {
  id: string;
  marca: string;
  modelo: string;
  description: string;
  thumbnail: string;
  images?: string[];
  bulletPoints: string[];
  category: string;
  color: string;
  kilometros: number;
  fuel: string;
  transmition: string;
  doors: number;
  engine: string;
  year: number;
}

const defaultValue = {
  marca: "",
  modelo: "",
  description: "",
  bulletPoints: [""],
  category: "",
  color: "",
  kilometros: 0,
  fuel: "",
  transmition: "",
  doors: 0,
  engine: "",
  year: 0,
};

export default function ProductForm(props: Props) {
  const { onSubmit, onImageRemove, initialValue } = props;
  const [isPending, startTransition] = useTransition();
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [thumbnail, setThumbnail] = useState<File>();
  const [isForUpdate, setIsForUpdate] = useState(false);
  const [productInfo, setProductInfo] = useState({ ...defaultValue });
  const [thumbnailSource, setThumbnailSource] = useState<string[]>();
  const [productImagesSource, setProductImagesSource] = useState<string[]>();

  const fields = productInfo.bulletPoints;
  const { rest } = props;

  const addMoreBulletPoints = () => {
    setProductInfo({
      ...productInfo,
      bulletPoints: [...productInfo.bulletPoints, ""],
    });
  };

  const removeBulletPoint = (indexToRemove: number) => {
    const points = [...productInfo.bulletPoints];
    const filteredPoints = points.filter((_, index) => index !== indexToRemove);
    setProductInfo({
      ...productInfo,
      bulletPoints: [...filteredPoints],
    });
  };

  const updateBulletPointValue = (value: string, index: number) => {
    const oldValues = [...fields];
    oldValues[index] = value;

    setProductInfo({ ...productInfo, bulletPoints: [...oldValues] });
  };

  const removeImage = async (index: number) => {
    if (!productImagesSource) return;

    // if image is from cloud we want to remove it from cloud.
    const imageToRemove = productImagesSource[index];
    const cloudSourceUrl = "https://res.cloudinary.com";
    if (imageToRemove.startsWith(cloudSourceUrl)) {
      onImageRemove && onImageRemove(imageToRemove);
    } else {
      // if this image is from local state we want to update local state
      const fileIndexDifference =
        productImagesSource.length - imageFiles.length;
      const indexToRemove = index - fileIndexDifference;
      const newImageFiles = imageFiles.filter((_, i) => {
        if (i !== indexToRemove) return true;
      });

      setImageFiles([...newImageFiles]);
    }

    // also we want to update UI
    const newImagesSource = productImagesSource.filter((_, i) => {
      if (i !== index) return true;
    });

    setProductImagesSource([...newImagesSource]);
  };

  const getBtnTitle = () => {
    if (isForUpdate) return isPending ? "Actualizando" : "Actualizar";
    return isPending ? "Creando" : "Crear";
  };

  useEffect(() => {
    if (initialValue) {
      setProductInfo({ ...initialValue });
      setThumbnailSource([initialValue.thumbnail]);
      setProductImagesSource(initialValue.images);
      setIsForUpdate(true);
    }
  }, []);

  const onImagesChange: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    const files = target.files;
    if (files) {
      const newImages = Array.from(files).map((item) => item);
      const oldImages = productImagesSource || [];
      setImageFiles([...imageFiles, ...newImages]);
      setProductImagesSource([
        ...oldImages,
        ...newImages.map((file) => URL.createObjectURL(file)),
      ]);
    }
  };

  const onThumbnailChange: ChangeEventHandler<HTMLInputElement> = ({
    target,
  }) => {
    const files = target.files;
    if (files) {
      const file = files[0];
      setThumbnail(file);
      setThumbnailSource([URL.createObjectURL(file)]);
    }
  };

  // console.log(initialValue?.id);

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="mb-2 text-xl">Add new product</h1>

      <form
        action={() =>
          startTransition(async () => {
            await onSubmit({ ...productInfo, images: imageFiles, thumbnail });
          })
        }
        className="space-y-6"
      >
        <div className="space-y-4">
          <h3>Poster</h3>
          <ImageSelector
            id="thumb"
            images={thumbnailSource}
            onChange={onThumbnailChange}
          />

          <h3>Imagenes</h3>
          <ImageSelector
            multiple
            id="images"
            images={productImagesSource}
            onRemove={removeImage}
            onChange={onImagesChange}
          />
        </div>

        <Input
          label="Marca"
          value={productInfo.marca}
          onChange={({ target }) =>
            setProductInfo({ ...productInfo, marca: target.value })
          }
          {...rest}
        />

        <Input
          label="Modelo"
          value={productInfo.modelo}
          onChange={({ target }) =>
            setProductInfo({ ...productInfo, modelo: target.value })
          }
          {...rest}
        />

        <Textarea
          className="h-52"
          label="Descripción"
          value={productInfo.description}
          onChange={({ target }) =>
            setProductInfo({ ...productInfo, description: target.value })
          }
          {...rest}
        />

        <Select
          onChange={(category) => {
            if (category) setProductInfo({ ...productInfo, category });
          }}
          value={productInfo.category}
          label="Fabricante"
          {...rest}
        >
          {categories.map((c) => (
            <Option value={c} key={c}>
              {c}
            </Option>
          ))}
        </Select>

        <Select
          onChange={(fuel) => {
            if (fuel) setProductInfo({ ...productInfo, fuel });
          }}
          value={productInfo.fuel}
          label="Combustible"
          {...rest}
        >
          {fuel_types.map((f) => (
            <Option value={f} key={f}>
              {f}
            </Option>
          ))}
        </Select>

        <Select
          onChange={(transmition) => {
            if (transmition) setProductInfo({ ...productInfo, transmition });
          }}
          value={productInfo.transmition}
          label="Transmisión"
          {...rest}
        >
          {transmition_types.map((t) => (
            <Option value={t} key={t}>
              {t}
            </Option>
          ))}
        </Select>

        <div className="flex space-x-4">
          <div className="space-y-4 flex-1">
            <h3>Motor</h3>
            <Input
              label="motor"
              value={productInfo.engine}
              onChange={({ target }) =>
                setProductInfo({ ...productInfo, engine: target.value })
              }
              {...rest}
            />
            <h3>Kilometros</h3>
            <Input
              value={productInfo.kilometros}
              label="km"
              onChange={({ target }) => {
                const kilometros = +target.value;
                setProductInfo({ ...productInfo, kilometros });
              }}
              className="mb-4"
              {...rest}
            />
          </div>

          <div className="space-y-4 flex-1">
            <h3>Puertas</h3>
            <Input
              value={productInfo.doors}
              label="puertas"
              onChange={({ target }) => {
                const doors = +target.value;
                setProductInfo({ ...productInfo, doors });
              }}
              className="mb-4"
              {...rest}
            />
            <h3>Año</h3>
            <Input
              value={productInfo.year}
              label="Año"
              onChange={({ target }) => {
                const year = +target.value;
                setProductInfo({ ...productInfo, year });
              }}
              className="mb-4"
              {...rest}
            />
            <h3>Color</h3>
            <Input
              label="Color"
              value={productInfo.color}
              onChange={({ target }) =>
                setProductInfo({ ...productInfo, color: target.value })
              }
              {...rest}
            />
          </div>
        </div>

        <div className="space-y-4">
          <h3>Caracteristicas</h3>
          {fields.map((field, index) => (
            <div key={index} className="flex items-center">
              <Input
                type="text"
                value={field}
                label={`Caracteristica ${index + 1}`}
                onChange={({ target }) =>
                  updateBulletPointValue(target.value, index)
                }
                className="mb-4"
                {...rest}
              />
              {fields.length > 1 ? (
                <button
                  onClick={() => removeBulletPoint(index)}
                  type="button"
                  className="ml-2"
                >
                  <TrashIcon className="w-5 h-5" />
                </button>
              ) : null}
            </div>
          ))}

          <button
            disabled={isPending}
            type="button"
            onClick={addMoreBulletPoints}
            className="flex items-center space-x-1 text-gray-800 ml-auto"
          >
            <PlusIcon className="w-4 h-4" />
            <span>Añadir Más</span>
          </button>
        </div>

        <Button disabled={isPending} type="submit" {...rest}>
          {getBtnTitle()}
        </Button>
      </form>
    </div>
  );
}
