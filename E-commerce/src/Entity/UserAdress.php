<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * UserAdress
 *
 * @ORM\Table(name="user_adress", indexes={@ORM\Index(name="user_id", columns={"user_id"})})
 * @ORM\Entity
 */
class UserAdress
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
     * @ORM\Column(name="address", type="integer", nullable=false)
     */
    private $address;

    /**
     * @var int
     *
     * @ORM\Column(name="zipcode", type="integer", nullable=false)
     */
    private $zipcode;

    /**
     * @var int
     *
     * @ORM\Column(name="country", type="integer", nullable=false)
     */
    private $country;

    /**
     * @var int
     *
     * @ORM\Column(name="name", type="integer", nullable=false)
     */
    private $name;

    /**
     * @var \User
     *
     * @ORM\ManyToOne(targetEntity="User")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="user_id", referencedColumnName="id")
     * })
     */
    private $user;


}
