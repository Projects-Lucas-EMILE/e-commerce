<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use JsonSerializable;
use Symfony\Component\Serializer\Annotation\Groups;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;

/**
 * Product
 *
 * @ORM\Table(name="product", indexes={@ORM\Index(name="sub_category_id", columns={"sub_category_id"}), @ORM\Index(name="category_id", columns={"category_id"})})
 * @ORM\Entity
 */
class Product implements JsonSerializable
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
     * @var string
     *
     * @ORM\Column(name="name", type="string", length=255, nullable=false)
     */
    private $name;

    /**
     * @var string
     *
     * @ORM\Column(name="description", type="text", length=65535, nullable=false)
     */
    private $description;

    /**
     * @var float
     *
     * @ORM\Column(name="price", type="float", precision=10, scale=0, nullable=false)
     */
    private $price;

    /**
     * @var string
     *
     * @ORM\Column(name="features", type="string", length=255, nullable=false)
     */
    private $features;


    /**
     * @var int
     *
     * @ORM\Column(name="discount", type="integer", nullable=true)
     */

    private $discount;

    /**
     * @var int
     *
     * @ORM\Column(name="views", type="integer", nullable=false)
     */
    private $views = '0';

    /**
     * @var int
     *
     * @ORM\Column(name="stock", type="integer", nullable=false)
     */
    private $stock = '0';

    /**
     * @var bool
     *
     * @ORM\Column(name="status", type="boolean", nullable=false)
     */
    private $status;

    /**
     * @var int
     *
     * @ORM\Column(name="weight", type="integer", nullable=false)
     */
    private $weight;

    /**
     * @var \Category
     *
     * @ORM\ManyToOne(targetEntity="Category")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="category_id", referencedColumnName="id")
     * })
     */
    private $category;

    /**
     * @var \SubCategory
     *
     * @ORM\ManyToOne(targetEntity="SubCategory")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="sub_category_id", referencedColumnName="id")
     * })
     */
    private $subCategory;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;
        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(string $description): self
    {
        $this->description = $description;
        return $this;
    }

    public function getPrice(): ?float
    {
        return $this->price;
    }

    public function setPrice(float $price): self
    {
        $this->price = $price;
        return $this;
    }

    public function getFeatures(): ?string
    {
        return $this->features;
    }

    public function setFeatures(string $features): self
    {
        $this->features = $features;
        return $this;
    }

    public function getViews(): int
    {
        return $this->views;
    }

    public function setViews(int $views): self
    {
        $this->views = $views;
        return $this;
    }

    public function getStock(): int
    {
        return $this->stock;
    }

    public function setStock(int $stock): self
    {
        $this->stock = $stock;
        return $this;
    }

    public function getStatus(): bool
    {
        return $this->status;
    }

    public function setStatus(bool $status): self
    {
        $this->status = $status;
        return $this;
    }

    public function getWeight(): int
    {
        return $this->weight;
    }

    public function setWeight(int $weight): self
    {
        $this->weight = $weight;
        return $this;
    }

    public function getDiscount(): int
    {
        return $this->discount;
    }

    public function setDiscount(int $discount): self
    {
        $this->discount = $discount;
        return $this;
    }

    public function getCategory(): ?Category
    {
        return $this->category;
    }

    public function setCategory(?Category $category): self
    {
        $this->category = $category;
        return $this;
    }

    /**
     * Set the associated SubCategory entity
     *
     * @param \App\Entity\SubCategory|null $subCategory
     * @return self
     */
    public function setSubCategory(?SubCategory $subCategory): self
    {
        $this->subCategory = $subCategory;
        return $this;
    }

    /**
     * Get the associated SubCategory entity
     *
     * @return \App\Entity\SubCategory|null
     */
    public function getSubCategory(): ?SubCategory
    {
        return $this->subCategory;
    }


    /**
     * @var \Doctrine\Common\Collections\Collection|\App\Entity\Image[]
     *
     * @ORM\OneToMany(targetEntity="App\Entity\Image", mappedBy="product", cascade={"persist"})
     */
    private $images;

    public function __construct()
    {
        $this->images = new ArrayCollection();
    }

    public function getImages(): Collection
    {
        return $this->images;
    }

    public function setImages(array $images): self
    {
        foreach ($images as $image) {
            $this->addImage($image);
        }

        return $this;
    }

    public function addImage(Image $image): self
    {
        if (!$this->images->contains($image)) {
            $this->images[] = $image;
            $image->setProduct($this);
        }

        return $this;
    }

    public function removeImage(Image $image): self
    {
        if ($this->images->contains($image)) {
            $this->images->removeElement($image);
            // set the owning side to null (unless already changed)
            if ($image->getProduct() === $this) {
                $image->setProduct(null);
            }
        }

        return $this;
    }


    public function jsonSerialize()
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'description' => $this->description,
            'price' => $this->price,
            'features' => $this->features,
            'views' => $this->views,
            'stock' => $this->stock,
            'status' => $this->status,
            'weight' => $this->weight,
            'final_price' => ($this->price - ($this->price * ($this->discount / 100))),
            'discount' => $this->discount,
            'category' => [
                'id' => $this->category->getId(),
                'name' => $this->category->getName(),
            ],
            'subCategory' => [
                'id' => $this->subCategory->getId(),
                'name' => $this->subCategory->getName(),
            ],
            'images' => $this->images->map(function (Image $image) {
                return [
                    'id' => $image->getId(),
                    'image' => $image->getImage(),
                ];
            })->toArray(),
        ];
    }
}