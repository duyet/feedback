/**
 * Type augmentation for Chakra UI v3 + React 19 compatibility.
 *
 * In React 19, ForwardRefExoticComponent no longer implicitly includes `children`.
 * Chakra v3 components built on Ark UI use ForwardRefExoticComponent with props
 * derived from complex type chains that may lose the `children` property during
 * type resolution. This augmentation restores `children` support.
 */
import type { ReactNode } from "react"

declare module "@chakra-ui/react" {
  // Dialog components
  interface DialogRootProps { children?: ReactNode }
  interface DialogPositionerProps { children?: ReactNode }
  interface DialogContentProps { children?: ReactNode }
  interface DialogHeaderProps { children?: ReactNode }
  interface DialogBodyProps { children?: ReactNode }
  interface DialogFooterProps { children?: ReactNode }
  interface DialogBackdropProps { children?: ReactNode }
  interface DialogTriggerProps { children?: ReactNode }
  interface DialogCloseTriggerProps { children?: ReactNode }
  interface DialogTitleProps { children?: ReactNode }
  interface DialogDescriptionProps { children?: ReactNode }
  interface DialogActionTriggerProps { children?: ReactNode }

  // Popover components
  interface PopoverRootProps { children?: ReactNode }
  interface PopoverTriggerProps { children?: ReactNode }
  interface PopoverPositionerProps { children?: ReactNode }
  interface PopoverContentProps { children?: ReactNode }
  interface PopoverHeaderProps { children?: ReactNode }
  interface PopoverBodyProps { children?: ReactNode }
  interface PopoverFooterProps { children?: ReactNode }
  interface PopoverCloseTriggerProps { children?: ReactNode }
  interface PopoverArrowProps { children?: ReactNode }

  // Menu components
  interface MenuRootProps { children?: ReactNode }
  interface MenuTriggerProps { children?: ReactNode }
  interface MenuPositionerProps { children?: ReactNode }
  interface MenuContentProps { children?: ReactNode }
  interface MenuItemProps { children?: ReactNode }
  interface MenuSeparatorProps { children?: ReactNode }

  // Tabs components
  interface TabsRootProps { children?: ReactNode }
  interface TabsListProps { children?: ReactNode }
  interface TabsTriggerProps { children?: ReactNode }
  interface TabsContentProps { children?: ReactNode }

  // Field components
  interface FieldRootProps { children?: ReactNode }
  interface FieldLabelProps { children?: ReactNode }
  interface FieldHelperTextProps { children?: ReactNode }
  interface FieldErrorTextProps { children?: ReactNode }

  // Alert components
  interface AlertRootProps { children?: ReactNode }
  interface AlertIndicatorProps { children?: ReactNode }
  interface AlertTitleProps { children?: ReactNode }
  interface AlertDescriptionProps { children?: ReactNode }

  // Tooltip components
  interface TooltipRootProps { children?: ReactNode }
  interface TooltipTriggerProps { children?: ReactNode }
  interface TooltipPositionerProps { children?: ReactNode }
  interface TooltipContentProps { children?: ReactNode }

  // Tag components
  interface TagRootProps { children?: ReactNode }

  // Card components
  interface CardRootProps { children?: ReactNode }
  interface CardHeaderProps { children?: ReactNode }
  interface CardBodyProps { children?: ReactNode }
  interface CardFooterProps { children?: ReactNode }

  // Stat components
  interface StatRootProps { children?: ReactNode }
  interface StatLabelProps { children?: ReactNode }
  interface StatHelpTextProps { children?: ReactNode }

  // Progress components
  interface ProgressTrackProps { children?: ReactNode }

  // Table components
  interface TableRootProps { children?: ReactNode }
  interface TableHeaderProps { children?: ReactNode }
  interface TableBodyProps { children?: ReactNode }
  interface TableRowProps { children?: ReactNode }
  interface TableColumnHeaderProps { children?: ReactNode }
  interface TableCellProps { children?: ReactNode }
  interface TableCaptionProps { children?: ReactNode }

  // List components
  interface ListRootProps { children?: ReactNode }
  interface ListItemProps { children?: ReactNode }
  interface ListIndicatorProps { children?: ReactNode }

  // Avatar
  interface AvatarRootProps { children?: ReactNode }
  interface AvatarGroupProps { children?: ReactNode }
  interface AvatarFallbackProps { children?: ReactNode }

  // Switch
  interface SwitchRootProps { children?: ReactNode }
  interface SwitchLabelProps { children?: ReactNode }

  // Accordion
  interface AccordionItemContentProps { children?: ReactNode }
  interface AccordionItemTriggerProps { children?: ReactNode }

  // Badge
  interface BadgeProps { children?: ReactNode }
}
