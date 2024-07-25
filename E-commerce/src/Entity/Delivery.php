<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Delivery
 *
 * @ORM\Table(name="delivery")
 * @ORM\Entity
 */
class Delivery
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
     * @var int
     *
     * @ORM\Column(name="method", type="integer", nullable=false)
     */
    private $method;

    /**
     * @var int
     *
     * @ORM\Column(name="rate", type="integer", nullable=false)
     */
    private $rate;

    /**
     * @var int
     *
     * @ORM\Column(name="country", type="integer", nullable=false)
     */
    private $country;

    /**
     * @var int
     *
     * @ORM\Column(name="weigth_from", type="integer", nullable=false)
     */
    private $weigthFrom;

    /**
     * @var int|null
     *
     * @ORM\Column(name="weight_to", type="integer", nullable=true)
     */
    private $weightTo;


}
