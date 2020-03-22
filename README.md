
# Variation of SIRD Model for Spread of Disease

This repository propose a visual of the spread of a disease based on a variation of the SIRD model. 

![preview](https://github.com/Coni63/SIRD_simulation/blob/master/preview.png)

## How to use

Simply open `index.html` and play with parameters prior to launch the simulation.

### Parameters

The model is a variation of the simple SIRD model. It's made to be more representative of what happens with COVID-19.

- Initially, there is a set of **susceptible** individuals and a second set of **infected** individuals (`Infected @ 0 day`). The sum of both being `Total Population`.
- During `Time to symptoms`, **infected** individuals will infect other individuals without knowing it. After this duration, there is `% w/ symptoms` % to have symptoms. 
- If you select `Quarantine w/ symptoms`, **infected** individuals having symptoms will be set to quarantine and won't infect **susceptible** individuals. 
- During infection, there is `Death Probability w or w/o symptoms` to die every day.
- After `Time to recover`, all "survivor" will have recovered.

### Infection

Infection model is based on SIR Model so:
```
\frac{\partial I}{\partial t} = Infectiosity \times \frac{S(t)}{Total\_Population} \times I(t)
```
With `I(t)` being the number of **infected** individuals at a given day and `S(t)` being the number of **susceptible** individuals