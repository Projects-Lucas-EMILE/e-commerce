<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;


/**
 * Category
 *
 * @ORM\Table(name="category")
 * @ORM\Entity
 */
class Category
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
     * @var Collection|SubCategory[]
     *
     * @ORM\OneToMany(targetEntity="SubCategory", mappedBy="category")
     */
    private $subCategories;

    public function __construct()
    {
        $this->subCategories = new ArrayCollection();
    }

    public function getSubCategories(): Collection
    {
        return $this->subCategories;
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function __toString()
    {
        return $this->name;
    }

    public function jsonSerialize()
    {
        // Get the subcategories and serialize them
        $subCategories = [];
        foreach ($this->subCategories as $subCategory) {
            $subCategories[] = [
                'id' => $subCategory->getId(),
                'name' => $subCategory->getName(),
            ];
        }

        return [
            'id' => $this->id,
            'name' => $this->name,
            'subCategories' => $subCategories,
        ];
    }


    public function setName(string $name): void
    {
        $this->name = $name;
    }
}
