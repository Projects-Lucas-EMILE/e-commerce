<?php

namespace App\Entity;

use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\Validator\Constraints as Assert;

use Doctrine\ORM\Mapping as ORM;
use App\Entity\Product;

/**
 * Image
 *
 * @ORM\Table(name="image", indexes={@ORM\Index(name="product_id", columns={"product_id"})})
 * @ORM\Entity
 */
class Image
{
    /**
     * @var int
     *
     * @ORM\Column(name="id", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $id;

    /**
     * @var UploadedFile|null
     * @Assert\Image(maxSize="2M", mimeTypes={"image/jpeg", "image/png", "image/gif"})
     */
    private $file;

    /**
     * @var string
     *
     * @ORM\Column(name="image", type="text", length=65535, nullable=false)
     */
    private $image;

    /**
     * @var \App\Entity\Product|null
     *
     * @ORM\ManyToOne(targetEntity="App\Entity\Product", inversedBy="images")
     * @ORM\JoinColumn(name="product_id", referencedColumnName="id")
     */
    private $product;

    /**
     * Get the ID of the image
     *
     * @return int
     */
    public function getId(): ?int
    {
        return $this->id;
    }

    /**
     * Set the ID of the image
     *
     * @param int $id
     * @return self
     */
    public function setId(int $id): self
    {
        $this->id = $id;
        return $this;
    }

    /**
     * Get the image content
     *
     * @return string
     */
    public function getImage(): ?string
    {
        return $this->image;
    }

    /**
     * Set the image content and handle the file upload
     *
     * @param UploadedFile|null $file
     * @return self
     */
    public function setImage(?UploadedFile $file): self
    {
        if ($file) {
            // Generate a unique filename to avoid overwriting existing files
            $filename = md5(uniqid()) . '.' . $file->guessExtension();

            // Move the uploaded file to the new directory
            $file->move('../frontend/public/products/images', $filename);

            // Update the 'image' property with the filename to be stored in the database
            $this->image = $filename;
        }

        $this->file = $file;

        return $this;
    }

    /**
     * Get the associated Product entity
     *
     * @return \Product|null
     */
    public function getProduct(): ?Product
    {
        return $this->product;
    }

    /**
     * Set the associated Product entity
     *
     * @param \Product|null $product
     * @return self
     */
    public function setProduct(?Product $product): self
    {
        $this->product = $product;
        return $this;
    }

    /**
     * Get the associated UploadedFile
     *
     * @return UploadedFile|null
     */
    public function getFile(): ?UploadedFile
    {
        return $this->file;
    }

    /**
     * Set the associated UploadedFile
     *
     * @param UploadedFile|null $file
     * @return self
     */
    public function setFile(?UploadedFile $file): self
    {
        $this->file = $file;
        return $this;
    }
}
