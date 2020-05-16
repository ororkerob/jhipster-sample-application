package com.sentio.food.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;
import java.time.ZonedDateTime;

/**
 * A Meal.
 */
@Entity
@Table(name = "meal")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Meal implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "jhi_when")
    private ZonedDateTime when;

    @OneToOne
    @JoinColumn(unique = true)
    private Recipe breakfast;

    @OneToOne
    @JoinColumn(unique = true)
    private Recipe lunch;

    @OneToOne
    @JoinColumn(unique = true)
    private Recipe dinner;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ZonedDateTime getWhen() {
        return when;
    }

    public Meal when(ZonedDateTime when) {
        this.when = when;
        return this;
    }

    public void setWhen(ZonedDateTime when) {
        this.when = when;
    }

    public Recipe getBreakfast() {
        return breakfast;
    }

    public Meal breakfast(Recipe recipe) {
        this.breakfast = recipe;
        return this;
    }

    public void setBreakfast(Recipe recipe) {
        this.breakfast = recipe;
    }

    public Recipe getLunch() {
        return lunch;
    }

    public Meal lunch(Recipe recipe) {
        this.lunch = recipe;
        return this;
    }

    public void setLunch(Recipe recipe) {
        this.lunch = recipe;
    }

    public Recipe getDinner() {
        return dinner;
    }

    public Meal dinner(Recipe recipe) {
        this.dinner = recipe;
        return this;
    }

    public void setDinner(Recipe recipe) {
        this.dinner = recipe;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Meal)) {
            return false;
        }
        return id != null && id.equals(((Meal) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Meal{" +
            "id=" + getId() +
            ", when='" + getWhen() + "'" +
            "}";
    }
}
