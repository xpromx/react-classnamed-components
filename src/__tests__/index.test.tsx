import React from "react"
import { render } from "@testing-library/react"
import e from "../index"

describe("Base API", () => {
  it("renders component with classnames ", () => {
    const Button = e("button")`m-2 p-2 rounded`
    const { getByText, container } = render(<Button>Click Me</Button>)
    expect(getByText("Click Me")).toBeDefined()
    expect(container.firstChild).toHaveClass("m-2 p-2 rounded")
  })

  it("renders component with default attributes ", () => {
    const Button = e("button").attrs({ type: "submit" })`m-2 p-2 rounded`
    const { getByText, container } = render(<Button>Click Me</Button>)
    expect(getByText("Click Me")).toBeDefined()
    expect(container.firstChild).toHaveClass("m-2 p-2 rounded")
    expect(container.firstChild).toHaveAttribute("type", "submit")
  })

  it("renders component with props ", () => {
    interface ButtonProps {
      hasError?: boolean
    }

    const Button = e("button").attrs({
      type: "submit"
    })<ButtonProps>((props: ButtonProps) => [
      "m-2 p-2 rounded",
      { "border border-red-100": props.hasError }
    ])
    const { getByText, container } = render(
      <Button hasError={true}>Click Me</Button>
    )
    expect(getByText("Click Me")).toBeDefined()
    expect(container.firstChild).toHaveClass(
      "m-2 p-2 rounded border border-red-100"
    )
    expect(container.firstChild).toHaveAttribute("type", "submit")
  })

  it("renders extending a component ", () => {
    const BaseButton = e("button")`m-2 p-2 rounded`
    const Button = e(BaseButton)`border border-red-100`

    const { getByText, container } = render(<Button>Click Me</Button>)
    expect(getByText("Click Me")).toBeDefined()
    expect(container.firstChild).toHaveClass(
      "m-2 p-2 rounded border border-red-100"
    )
  })
})

describe("Advance API", () => {
  it("renders component with classnames ", () => {
    const Button = e.button`m-2 p-2 rounded`
    const { getByText, container } = render(<Button>Click Me</Button>)
    expect(getByText("Click Me")).toBeDefined()
    expect(container.firstChild).toHaveClass("m-2 p-2 rounded")
  })

  it("renders component with default attributes ", () => {
    const Button = e.button.attrs({ type: "submit" })`m-2 p-2 rounded`
    const { getByText, container } = render(<Button>Click Me</Button>)
    expect(getByText("Click Me")).toBeDefined()
    expect(container.firstChild).toHaveClass("m-2 p-2 rounded")
    expect(container.firstChild).toHaveAttribute("type", "submit")
  })

  it("renders component with props ", () => {
    interface ButtonProps {
      hasError?: boolean
    }

    const Button = e.button.attrs({
      type: "submit"
    })<ButtonProps>((props: ButtonProps) => [
      "m-2 p-2 rounded",
      { "border border-red-100": props.hasError }
    ])
    const { getByText, container } = render(
      <Button hasError={true}>Click Me</Button>
    )
    expect(getByText("Click Me")).toBeDefined()
    expect(container.firstChild).toHaveClass(
      "m-2 p-2 rounded border border-red-100"
    )
    expect(container.firstChild).toHaveAttribute("type", "submit")
  })

  it("renders extending a component ", () => {
    const BaseButton = e.button`m-2 p-2 rounded`
    const Button = e(BaseButton)`border border-red-100`

    const { getByText, container } = render(<Button>Click Me</Button>)
    expect(getByText("Click Me")).toBeDefined()
    expect(container.firstChild).toHaveClass(
      "m-2 p-2 rounded border border-red-100"
    )
  })
})
